import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { Button, Container, Col, Row } from 'reactstrap';

import { getLastRecord } from '../../stitch';
import { useStitchAuth } from '../StitchAuth';
import { useTimeClockRecords } from '../useTimeClockRecords';
import UserProfile from './UserProfile';
import DailyReport from './DailyReport';

export default function Dashboard({ currentUser, startDate, endDate }) {
  // const { currentUser } = useStitchAuth();
  const [time, setTime] = useState();
  const [hasClockedIn, setHasClockedIn] = useState(false);
  const [lastRecordId, setLastRecordId] = useState();
  // const [reportToShow, setReportToShow] = useState('daily');
  const { actions } = useTimeClockRecords('daily', startDate, endDate, currentUser.id);

  useEffect(() => {
    async function findLastRecord() {
      const lastRecord = await getLastRecord(currentUser.id);

      if (lastRecord && !lastRecord.timeOut) {
        setHasClockedIn(true);
        setTime(lastRecord.timeIn);
        setLastRecordId(lastRecord._id);
      }
    }

    /* async function findLastRecord() {
      const query = { owner_id: currentUser.id };
      const options = { sort: { _id: -1 } };

      const lastRecord = await records.findOne(query, options);

      if (lastRecord && !lastRecord.timeOut) {
        setHasClockedIn(true);
        setTime(lastRecord.timeIn);
        setLastRecordId(lastRecord._id);
      }
    } */

    findLastRecord();
  }, [currentUser]);

  function handleClockIn() {
    const newRecord = {
      /* owner_id: currentUser.id,
      owner_name: currentUser.profile.name, */
      timeIn: new Date(),
      timeOut: null
    };

    actions.addRecordFromDaily(newRecord).then(res => {
      setHasClockedIn(true);
      setTime(new Date());
      setLastRecordId(res.insertedId);
    });

    /* records.insertOne(newRecord)
      .then(res => {
        setHasClockedIn(true);
        setTime(new Date());
        setLastRecordId(res.insertedId);
      })
      .catch(err => console.error(`Failed to insert item: ${err}`)); */
  }

  function handleClockOut() {
    actions.editRecord({ _id: lastRecordId, timeIn: time, timeOut: new Date() }).then(res => {
      setHasClockedIn(false);
      setTime(null);
    });

    /* const query = { _id: lastRecordId };
    const options = { returnNewDocument: true };
    const update = { $set: { timeOut: new Date() } };

    records.findOneAndUpdate(query, update, options)
      .then(updatedRecord => {
        if (updatedRecord) {
          setHasClockedIn(false);
          setTime(null);
        } else {
          console.error(`No document matches the provided query: ${query._id}`);
        }
      })
      .catch(err => console.error(`Failed to find and update document: ${err}`)); */
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col>
          <h1 className="text-center">
            Welcome, {currentUser.profile.name}
          </h1>
        </Col>
      </Row>
      <Row className="justify-content-center mb-2">
        <Col lg="4" md="6">
          {!hasClockedIn ? (
            <Button color="primary" className="btn-block" onClick={handleClockIn}>Clock In</Button>
          ) : (
              <>
                <Button color="primary" className="btn-block" onClick={handleClockOut}>Clock Out</Button>
                <div className="mt-3 text-center">
                  {time ? (
                    `Clocked in at ${dayjs(time).format('h:mm A M/D/YY')}`
                  ) : null}
                </div>
              </>
            )}
        </Col>
      </Row>
      <Row>
        <Col>
          <DailyReport currentUser={currentUser} />
          <UserProfile userId={currentUser.id} />
        </Col>
      </Row>
    </Container>
  );
}

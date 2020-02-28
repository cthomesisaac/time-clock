import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Button, Container, Col, Row } from 'reactstrap';

import { getLastRecord } from '../../stitch';
import { useStitchAuth } from '../StitchAuth';
import { useTimeClockRecords } from '../useTimeClockRecords';
import UserProfile from './UserProfile';
import DailyReport from './DailyReport';

export default function TimeClock() {
  const { currentUser } = useStitchAuth();
  const [time, setTime] = useState();
  const [hasClockedIn, setHasClockedIn] = useState(false);
  const [lastRecordId, setLastRecordId] = useState();
  const [reportToShow, setReportToShow] = useState('daily');
  const [startDate, setStartDate] = useState({
    weekly: dayjs().day(1).toDate(),
    user: dayjs().subtract(30, 'd').toDate(),
    daily: dayjs().startOf('day').toDate()
  });
  const [endDate, setEndDate] = useState({
    weekly: dayjs().day(6).toDate(),
    user: new Date(),
    daily: dayjs().startOf('day').add(24, 'hour').toDate()
  });
  const { records, dailyTotal, user, actions } = useTimeClockRecords(reportToShow, startDate.daily, endDate.daily, currentUser.id);

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

    actions.addRecord(newRecord).then(res => {
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
          <DailyReport userId={currentUser.id} records={records} dailyTotal={dailyTotal} />
          <UserProfile userId={currentUser.id} />
        </Col>
      </Row>
    </Container>
  );
}

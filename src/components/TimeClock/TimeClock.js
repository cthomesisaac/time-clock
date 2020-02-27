import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Button, Container, Col, Row } from 'reactstrap';

import { records } from '../../stitch';
import { useStitchAuth } from '../StitchAuth';

export default function TimeClock() {
  const { currentUser } = useStitchAuth();
  const [time, setTime] = useState();
  const [hasClockedIn, setHasClockedIn] = useState(false);
  const [lastRecordId, setLastRecordId] = useState();

  useEffect(() => {
    async function findLastRecord() {
      const query = { owner_id: currentUser.id };
      const options = { sort: { _id: -1 } };

      const lastRecord = await records.findOne(query, options);

      if (lastRecord && !lastRecord.timeOut) {
        setHasClockedIn(true);
        setTime(lastRecord.timeIn);
        setLastRecordId(lastRecord._id);
      }
    }

    findLastRecord();
  }, [currentUser]);

  function handleClockIn() {
    const newRecord = {
      owner_id: currentUser.id,
      owner_name: currentUser.profile.name,
      timeIn: new Date(),
      timeOut: null
    };

    records.insertOne(newRecord)
      .then(res => {
        setHasClockedIn(true);
        setTime(new Date());
        setLastRecordId(res.insertedId);
      })
      .catch(err => console.error(`Failed to insert item: ${err}`));
  }

  function handleClockOut() {
    const query = { _id: lastRecordId };
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
      .catch(err => console.error(`Failed to find and update document: ${err}`));
  }

  return (
    <Container>
      <Row className="justify-content-center">
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
    </Container>
  );
}

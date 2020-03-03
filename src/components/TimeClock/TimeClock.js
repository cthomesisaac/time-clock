import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import dayjs from 'dayjs';
import { Button, Container, Col, Row } from 'reactstrap';

import { getLastRecord } from '../../stitch';
import { useStitchAuth } from '../StitchAuth';
import { useTimeClockRecords } from '../useTimeClockRecords';
import Dashboard from './Dashboard';
import WeeklyReport from './WeeklyReport';
import UserReport from './UserReport';
import UserProfile from './UserProfile';
import DailyReport from './DailyReport';

export default function TimeClock() {
  const { currentUser } = useStitchAuth();
  // const [time, setTime] = useState();
  // const [hasClockedIn, setHasClockedIn] = useState(false);
  // const [lastRecordId, setLastRecordId] = useState();
  // const [reportToShow, setReportToShow] = useState('daily');
  const [startDate, setStartDate] = useState({
    weekly: dayjs().startOf('day').day(1).toDate(),
    user: dayjs().startOf('day').subtract(30, 'd').toDate(),
    daily: dayjs().startOf('day').toDate()
  });
  const [endDate, setEndDate] = useState({
    weekly: dayjs().endOf('day').day(6).toDate(),
    user: new Date(),
    daily: dayjs().startOf('day').add(24, 'hour').toDate()
  });
  // const { records, dailyTotal, user, actions } = useTimeClockRecords(reportToShow, startDate.daily, endDate.daily, currentUser.id);

  // useEffect(() => {
  //   async function findLastRecord() {
  //     const lastRecord = await getLastRecord(currentUser.id);

  //     if (lastRecord && !lastRecord.timeOut) {
  //       setHasClockedIn(true);
  //       setTime(lastRecord.timeIn);
  //       setLastRecordId(lastRecord._id);
  //     }
  //   }

  //   /* async function findLastRecord() {
  //     const query = { owner_id: currentUser.id };
  //     const options = { sort: { _id: -1 } };

  //     const lastRecord = await records.findOne(query, options);

  //     if (lastRecord && !lastRecord.timeOut) {
  //       setHasClockedIn(true);
  //       setTime(lastRecord.timeIn);
  //       setLastRecordId(lastRecord._id);
  //     }
  //   } */

  //   findLastRecord();
  // }, [currentUser]);

  // function handleClockIn() {
  //   const newRecord = {
  //     /* owner_id: currentUser.id,
  //     owner_name: currentUser.profile.name, */
  //     timeIn: new Date(),
  //     timeOut: null
  //   };

  //   actions.addRecord(newRecord).then(res => {
  //     setHasClockedIn(true);
  //     setTime(new Date());
  //     setLastRecordId(res.insertedId);
  //   });

  //   /* records.insertOne(newRecord)
  //     .then(res => {
  //       setHasClockedIn(true);
  //       setTime(new Date());
  //       setLastRecordId(res.insertedId);
  //     })
  //     .catch(err => console.error(`Failed to insert item: ${err}`)); */
  // }

  // function handleClockOut() {
  //   actions.editRecord({ _id: lastRecordId, timeIn: time, timeOut: new Date() }).then(res => {
  //     setHasClockedIn(false);
  //     setTime(null);
  //   });

  //   /* const query = { _id: lastRecordId };
  //   const options = { returnNewDocument: true };
  //   const update = { $set: { timeOut: new Date() } };

  //   records.findOneAndUpdate(query, update, options)
  //     .then(updatedRecord => {
  //       if (updatedRecord) {
  //         setHasClockedIn(false);
  //         setTime(null);
  //       } else {
  //         console.error(`No document matches the provided query: ${query._id}`);
  //       }
  //     })
  //     .catch(err => console.error(`Failed to find and update document: ${err}`)); */
  // }

  return (
    <Switch>
      {/* <Route path="/:id/user"></Route> */}
      <Route exact path="/dashboard">
        <Dashboard currentUser={currentUser} startDate={startDate.daily} endDate={endDate.daily} />
      </Route>
      <Route path="/dashboard/weekly">
        <WeeklyReport currentUser={currentUser} startDate={startDate.weekly} setStartDate={setStartDate} endDate={endDate.weekly} setEndDate={setEndDate} />
      </Route>
      <Route path="/dashboard/user">
        <UserReport currentUser={currentUser} startDate={startDate.user} setStartDate={setStartDate} endDate={endDate.user} />
      </Route>
      <Route path="/dashboard/daily/:dateFromParams">
        <DailyReport currentUser={currentUser} startDate={startDate.user} setStartDate={setStartDate} endDate={endDate.user} />
      </Route>
    </Switch>
  );
}

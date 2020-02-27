import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import dayjs from 'dayjs';
import { Row, Col } from 'reactstrap';

import WeeklyReport from './WeeklyReport';
import UserReport from './UserReport';
import DailyReport from './DailyReport';

export default function TimeClockAdmin() {
  const [startDate, setStartDate] = useState({
    weekly: dayjs().day(1).toDate(),
    user: dayjs().subtract(30, 'd').toDate()
  });
  const [endDate, setEndDate] = useState({
    weekly: dayjs().day(6).toDate(),
    user: new Date()
  });
  
  return (
    <>
      <Row>
        <Col>
          <h1>Time Clock Administration</h1>
        </Col>
      </Row>
      <Switch>
        <Route path="/admin/user/:id/:date">
          <DailyReport />
        </Route>
        <Route path="/admin/user/:id">
          <UserReport startDate={startDate.user} setStartDate={setStartDate} endDate={endDate.user} setEndDate={setEndDate} />
        </Route>
        <Route exact path="/admin">
          <WeeklyReport startDate={startDate.weekly} setStartDate={setStartDate} endDate={endDate.weekly} setEndDate={setEndDate} />
        </Route>
      </Switch>
    </>
  );
}

import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import dayjs from 'dayjs';
import { Row, Col, Container } from 'reactstrap';

import WeeklyReport from './WeeklyReport';
import UserReport from './UserReport';
import DailyReport from './DailyReport';
import Notifications from '../Notifications';
import BankedHoursReport from './BankedHoursReport';
import WeeklyBankedHoursReport from './WeeklyBankedHoursReport';

export default function TimeClockAdmin() {
  const [startDate, setStartDate] = useState({
    weekly: dayjs().startOf('day').day(1).startOf('day').toDate(),
    user: dayjs().startOf('day').subtract(30, 'd').toDate(),
    bankedHours: dayjs().startOf('day').day(-6).toDate()
  });
  const [endDate, setEndDate] = useState({
    weekly: dayjs().day(6).endOf('day').toDate(),
    user: dayjs().endOf('day').toDate(),
    bankedHours: dayjs().startOf('day').day(-1).toDate()
  });

  useEffect(() => {
    document.title = 'CT Homes—Time Clock Admin'
  })
  
  return (
    <Container>
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
        <Route path="/admin/notifications">
          <Notifications />
        </Route>
        <Route path="/admin/bankedhours">
          <BankedHoursReport />
        </Route>
        <Route path="/admin/weeklybankedhours">
          <WeeklyBankedHoursReport start={startDate.bankedHours} end={endDate.bankedHours} setStart={setStartDate} setEnd={setEndDate} />
        </Route>
        <Route exact path="/admin">
          <WeeklyReport startDate={startDate.weekly} setStartDate={setStartDate} endDate={endDate.weekly} setEndDate={setEndDate} />
        </Route>
      </Switch>
    </Container>
  );
}

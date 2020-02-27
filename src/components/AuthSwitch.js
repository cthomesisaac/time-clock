import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import TimeClock from './TimeClock/TimeClock';
import TimeClockAdmin from './TimeClockAdmin/TimeClockAdmin';

export default function AuthSwitch({ userRole }) {
  if (userRole.isLoaded) {
    if (userRole.role === 'admin') {
      return (
        <Switch>
          <Route path="/admin">
            <TimeClockAdmin />
          </Route>
          <Route exact path="/">
            <TimeClock />
          </Route>
          <Route path="/">
            <Redirect to="/" />
          </Route>
        </Switch>
      );
    } else {
      return (
        <Switch>
          <Route exact path="/">
            <TimeClock />
          </Route>
          <Route path="/">
            <Redirect to="/" />
          </Route>
        </Switch>
      );
    }
  } else {
    return <div>Loading...</div>;
  }
}

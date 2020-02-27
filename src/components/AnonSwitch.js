import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from './Login';

export default function AnonSwitch({ handleLogin }) {
  return (
    <Switch>
      <Route path="/login">
        <Login handleLogin={handleLogin} />
      </Route>
      <Route path="/">
        <Redirect to="/login" />
      </Route>
    </Switch>
  )
}

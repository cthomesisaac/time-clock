import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router
} from 'react-router-dom';
import { Container } from 'reactstrap';

import { users } from '../stitch';
import { StitchAuthProvider, useStitchAuth } from './StitchAuth';
import Navigation from './Navigation';
import AnonSwitch from './AnonSwitch';
import AuthSwitch from './AuthSwitch';

export default function AppShell() {
  return (
    <Router>
      <StitchAuthProvider>
        <App />
      </StitchAuthProvider>
    </Router>
  );
}

function App() {
  const {
    isLoggedIn,
    currentUser,
    actions: { handleLogin, handleLogout }
  } = useStitchAuth();

  const [userRole, setUserRole] = useState({ role: 'user', isLoaded: false });

  useEffect(() => {
    if (isLoggedIn) {
      users.findOne({ user_id: currentUser.id }).then(user => {
        if (user.role === 'admin') {
          setUserRole({ role: 'admin', isLoaded: true });
        } else if (user.role === 'user') {
          setUserRole({ role: 'user', isLoaded: true });
        }
      });
    }
  }, [isLoggedIn, currentUser]);

  return (
    <>
      <Navigation isLoggedIn={isLoggedIn} userRole={userRole} handleLogout={handleLogout} />
      <Container>
        {isLoggedIn ? <AuthSwitch userRole={userRole} /> : <AnonSwitch handleLogin={handleLogin} />}
      </Container>
    </>
  )
}

import React from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar, NavbarBrand, Button,
  NavItem,
  NavLink,
  Nav
} from 'reactstrap';

import Notifications from './Notifications';

export default function Navigation({ isLoggedIn, userRole, handleLogout }) {
  if (isLoggedIn) {
    if (userRole.role === 'admin') {
      return <AdminNav handleLogout={handleLogout} />;
    } else {
      return <UserNav handleLogout={handleLogout} />;
    }
  } else {
    return <AnonymousNav />
  }
}

function AnonymousNav() {
  return (
    <Navbar>
      <NavbarBrand>
        Time Clock
      </NavbarBrand>
    </Navbar>
  )
}

function UserNav({ handleLogout }) {
  return (
    <Navbar>
      <NavbarBrand>
        Time Clock
      </NavbarBrand>
      <Nav className="mr-auto">
        <NavItem>
          <NavLink tag={Link} to="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/dashboard/weekly">Reports</NavLink>
        </NavItem>
      </Nav>
      <Button onClick={handleLogout}>Log Out</Button>
    </Navbar>
  )
}

function AdminNav({ handleLogout }) {
  return (
    <Navbar>
      <NavbarBrand>
        Time Clock
      </NavbarBrand>
      <Nav className="mr-auto">
        <NavItem>
          <NavLink tag={Link} to="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/dashboard/weekly">Reports</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/admin">Admin</NavLink>
        </NavItem>
        <NavItem>
          <Notifications />
        </NavItem>
      </Nav>
      <Button onClick={handleLogout}>Log Out</Button>
    </Navbar>
  )
}

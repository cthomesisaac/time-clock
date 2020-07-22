import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import { getNotifications } from '../stitch';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(isOpen => !isOpen);

  useEffect(() => {
    (async function fetchNotifications() {
      const res = await getNotifications();
      setNotifications(res);
    })();
  }, []);

  return (
    <Dropdown isOpen={isOpen} toggle={toggle}>
      <DropdownToggle caret nav>
        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-bell-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
        </svg>
      </DropdownToggle>
      <DropdownMenu>
        {notifications.map(notification => {
          notification.prettyDate = moment(notification.date).format('L');
          return (
            <DropdownItem key={notification._id} tag={Link} to={`/admin/user/${notification.user_id}/${notification.date.valueOf()}`}>
              <div>{notification.name}</div>
              <div>{notification.type}</div>
              <div>{notification.prettyDate}</div>
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
}

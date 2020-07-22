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
      <DropdownToggle caret nav>Notifications</DropdownToggle>
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

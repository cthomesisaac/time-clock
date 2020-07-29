import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {
  Table, Button
} from 'reactstrap';

import { useTimeClockRecords } from './useTimeClockRecords';

export default function Notifications() {
  const { notifications } = useTimeClockRecords('notifs');

  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {notifications.map(notification => {
          notification.prettyDate = moment(notification.date).format('L');
          return (
            <tr key={notification._id}>
              <td className="align-middle">{notification.name}</td>
              <td className="align-middle">{notification.type}</td>
              <td className="align-middle">{notification.prettyDate}</td>
              <td>
                <Button tag={Link} to={`/admin/user/${notification.user_id}/${notification.date.valueOf()}`}>View</Button>
                <Button color="danger" className="ml-1">X</Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

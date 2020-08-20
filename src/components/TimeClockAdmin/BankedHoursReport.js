import React from 'react';
import { Table } from 'reactstrap';

import { useTimeClockRecords } from '../useTimeClockRecords';
import BankedHours from './BankedHours';

export default function BankedHoursReport() {
  const { users, actions } = useTimeClockRecords('bankedHours');
  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Banked Hours</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user._id}>
            <td>
              {user.name}
            </td>
            <td>
              <BankedHours user={user} editUser={actions.editUserFromArray} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
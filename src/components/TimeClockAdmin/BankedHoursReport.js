import React from 'react';
import { Table } from 'reactstrap';

import { useTimeClockRecords } from '../useTimeClockRecords';
import BankedHours from './BankedHours';

export default function BankedHoursReport() {
  const { records, actions } = useTimeClockRecords('weekly');
  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Banked Hours</th>
        </tr>
      </thead>
      <tbody>
        {records.map(user => (
          <tr key={user._id}>
            <td>
              {user.name}
            </td>
            <td>
              <BankedHours user={user} editUser={actions.editUser} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
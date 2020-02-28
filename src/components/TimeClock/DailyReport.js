import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Table } from 'reactstrap';

import { useTimeClockRecords } from '../useTimeClockRecords';

export default function DailyReport({ date = dayjs(), records, dailyTotal }) {
  const [startDate] = useState(date.startOf('day').toDate());
  // const [endDate] = useState(date.startOf('day').add(24, 'hour').toDate());
  // const { records, dailyTotal } = useTimeClockRecords('daily', startDate, endDate, userId);

  return (
    <>
      <h3>
        {dayjs(startDate).format('dddd, MMMM D, YYYY')}
      </h3>
      {records.length > 0 ? (
        <>
          <Table>
            <thead>
              <tr>
                <th>Time In</th>
                <th>Time Out</th>
              </tr>
            </thead>
            <tbody>
              {records.map(record => (
                <tr key={record._id}>
                  <td className="align-middle">{dayjs(record.timeIn).format('h:mm A')}</td>
                  <td className="align-middle">{dayjs(record.timeOut).isValid() ? dayjs(record.timeOut).format('h:mm A') : ''}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="ml-3">Total: {dailyTotal}</div>
        </>
      ) : (
          <div>No records for today</div>
        )}
    </>
  );
}

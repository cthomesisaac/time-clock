import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import moment from 'moment';
import { Breadcrumb, BreadcrumbItem, Table, Button } from 'reactstrap';

import { useTimeClockRecords } from '../useTimeClockRecords';
import EditModal from './EditModal';
import AddModal from './AddModal';

export default function DailyReport() {
  const { id, date } = useParams();
  const startDate = useMemo(() => dayjs(parseInt(date)).startOf('day').toDate(), [date]);
  const endDate = useMemo(() => dayjs(parseInt(date)).startOf('day').add(24, 'hour').toDate(), [date]);
  const { records, dailyTotal, actions, user } = useTimeClockRecords('daily', startDate, endDate, id);

  function onClick(recordId) {
    if (window.confirm('Are you sure you want to delete?')) {
      actions.deleteRecord(recordId);
    }
  }

  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/admin">Weekly Report</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to={`/admin/user/${id}`}>User Report</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>Daily Report</BreadcrumbItem>
      </Breadcrumb>
      <h3 className="mx-3">
        <span>{moment(parseInt(date)).format('dddd, MMMM D, YYYY')}</span>
      </h3>
      <div className="mx-3 mb-2 d-flex">
        <h5 className="pt-2 mr-auto">
          {user.name}
        </h5>
        <AddModal date={date} addRecord={actions.addRecordFromDaily} />
        <Button className="mx-1" onClick={() => actions.addLunchTime(records)}>Add Lunch</Button>
        <Button className="mx-1" onClick={() => actions.addPTOTime(date)}>Add PTO</Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Time In</th>
            <th>Time Out</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map(record => (
            <tr key={record._id}>
              <td className="align-middle">{dayjs(record.timeIn).format('h:mm A')}</td>
              <td className="align-middle">{dayjs(record.timeOut).isValid() ? dayjs(record.timeOut).format('h:mm A') : ''}</td>
              <td style={{ width: '20%' }}>
                <EditModal recordToEdit={record} editRecord={actions.editRecord} />
                <Button color="danger" onClick={() => onClick(record._id)}>X</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="ml-3">Total: {parseFloat(dailyTotal).toFixed(1)}</div>
    </>
  );
}

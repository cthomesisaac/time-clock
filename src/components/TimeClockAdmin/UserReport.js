import React from 'react';
import { useParams, Link } from 'react-router-dom';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';
import { Table, Breadcrumb, BreadcrumbItem, ButtonGroup, Button, Row, Col } from 'reactstrap';

import { useTimeClockRecords } from '../useTimeClockRecords';
import BankedHours from './BankedHours';
import AddModal from './AddModal';

export default function UserReport({ startDate, setStartDate, endDate }) {
  const { id } = useParams();
  /* const [startDate, setStartDate] = useState(dayjs().subtract(30, 'd').toDate());
  const [endDate] = useState(new Date()); */
  const { records, firstRecord, user, actions } = useTimeClockRecords('user', startDate, endDate, id);

  return (
    <Row>
      <Col>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/admin">Weekly Report</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>User Report</BreadcrumbItem>
        </Breadcrumb>
        <div className="mx-3">
          <div className="d-flex justify-content-between">
            <h3 className="m-0">{user.name}</h3>
            <AddModal date={new Date().valueOf()} addRecord={actions.addRecordFromUser} />
          </div>
          <BankedHours user={user} editUser={actions.editUser} />
        </div>
        <div className="mx-auto mb-1" style={{ width: 'fit-content' }}>
          <span className="mr-1">
            Start Date:
          </span>
          <span className="mr-3">
            <DatePicker selected={startDate} />
          </span>
          <span className="mr-1">
            End Date:
          </span>
          <span>
            <DatePicker selected={endDate} />
          </span>
        </div>
        <ButtonGroup className="mx-auto d-block mb-1" style={{ width: 'fit-content' }}>
          <Button onClick={() => setStartDate(startDate => ({ ...startDate, user: dayjs().subtract(30, 'd').toDate() }))}>
            30 days
          </Button>
          <Button onClick={() => setStartDate(startDate => ({ ...startDate, user: dayjs().subtract(90, 'd').toDate() }))}>
            90 days
          </Button>
          <Button onClick={() => setStartDate(startDate => ({ ...startDate, user: dayjs().subtract(180, 'd').toDate() }))}>
            180 days
          </Button>
          <Button onClick={() => setStartDate(startDate => ({ ...startDate, user: dayjs().subtract(365, 'd').toDate() }))}>
            1 year
          </Button>
        </ButtonGroup>
        <Table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Hours</th>
            </tr>
          </thead>
          <tbody>
            {firstRecord.map(record => (
              <tr key={record._id}>
                <td>
                  <Link to={`/admin/user/${id}/${record.rawDate.valueOf()}`}>
                    {record._id}
                  </Link>
                </td>
                <td>{record.hoursForDay.toFixed(1)}</td>
              </tr>
            ))}
            {records.map(record => (
              <tr key={record._id}>
                <td>
                  <Link to={`/admin/user/${id}/${record.rawDate.valueOf()}`}>
                    {record._id}
                  </Link>
                </td>
                <td>{record.hoursForDay.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
}

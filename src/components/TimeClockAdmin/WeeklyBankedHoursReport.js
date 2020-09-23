import React, { Fragment } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { Row, Col, Table, ButtonGroup, Button } from 'reactstrap';

import { useTimeClockRecords } from '../useTimeClockRecords';
import WeeklyBankedHours from './WeeklyBankedHours';

export default function WeeklyBankedHoursReport({ start, end, setStart, setEnd }) {
  const { users } = useTimeClockRecords('bankedHours');

  return (
    <Fragment>
      <Row className="justify-content-center mb-1">
        <Col md={{ span: 'auto', offset: 'auto' }}>
          <span>Start: </span>
          <DatePicker selected={start} />
        </Col>
        <Col md={{ span: 'auto', offset: 'auto' }}>
          <span>End: </span>
          <DatePicker selected={end} />
        </Col>
      </Row>
      <Row className="justify-content-center mb-3">
        <ButtonGroup>
          <Button variant="outline-primary" onClick={() => {
            setStart(startDate => ({ ...startDate, bankedHours: moment().startOf('day').day(1).subtract(1, 'week').toDate() }));
            setEnd(endDate => ({ ...endDate, bankedHours: moment().endOf('day').day(6).subtract(1, 'week').toDate() }));
          }}>Last week</Button>
          <Button variant="outline-primary" onClick={() => {
            setStart(startDate => ({ ...startDate, bankedHours: moment().startOf('day').day(1).subtract(2, 'week').toDate() }));
            setEnd(endDate => ({ ...endDate, bankedHours: moment().endOf('day').day(6).subtract(2, 'week').toDate() }));
          }}>2 weeks ago</Button>
          <Button variant="outline-primary" onClick={() => {
            setStart(startDate => ({ ...startDate, bankedHours: moment().startOf('day').day(1).subtract(3, 'week').toDate() }));
            setEnd(endDate => ({ ...endDate, bankedHours: moment().endOf('day').day(6).subtract(3, 'week').toDate() }));
          }}>3 weeks ago</Button>
          <Button variant="outline-primary" onClick={() => {
            setStart(startDate => ({ ...startDate, bankedHours: moment().startOf('day').day(1).subtract(4, 'week').toDate() }));
            setEnd(endDate => ({ ...endDate, bankedHours: moment().endOf('day').day(6).subtract(4, 'week').toDate() }));
          }}>4 weeks ago</Button>
        </ButtonGroup>
      </Row>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Hours For Week</th>
            <th>Change For Week</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <WeeklyBankedHours start={start} userId={user.user_id} />
            </tr>
          ))}
        </tbody>
      </Table>
    </Fragment>
  )
}

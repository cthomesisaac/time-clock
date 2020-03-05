import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';
import { Table, Breadcrumb, BreadcrumbItem, ButtonGroup, Button, Container, Row, Col } from 'reactstrap';

import { useTimeClockRecords } from '../useTimeClockRecords';
import BankedHours from './BankedHours';

export default function UserReport({ currentUser, startDate, setStartDate, endDate, unclockedHours }) {
  // const { id } = useParams();
  /* const [startDate, setStartDate] = useState(dayjs().subtract(30, 'd').toDate());
  const [endDate] = useState(new Date()); */
  const { records, firstRecord } = useTimeClockRecords('user', startDate, endDate, currentUser.id);

  return (
    <Container>
      <Row>
        <Col>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/dashboard/weekly">Weekly Report</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>User Report</BreadcrumbItem>
          </Breadcrumb>
          <div className="ml-3">
            <h3>{currentUser.profile.name}</h3>
            <BankedHours userId={currentUser.id} />
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
                    <Link to={`/dashboard/daily/${record.rawDate.valueOf()}`}>
                      {record._id}
                    </Link>
                  </td>
                  <td>{(record.hoursForDay + unclockedHours).toFixed(1)}</td>
                </tr>
              ))}
              {records.map(record => (
                <tr key={record._id}>
                  <td>
                    <Link to={`/dashboard/daily/${record.rawDate.valueOf()}`}>
                      {record._id}
                    </Link>
                  </td>
                  {/* <td>
                    <DailyTotal
                      startDate={dayjs(record.rawDate).startOf('day').toDate()}
                      endDate={dayjs(record.rawDate).startOf('day').add(24, 'h').toDate()}
                      currentUser={currentUser}
                      altValue={record.hoursForDay}
                    />
                  </td> */}
                  <td>{record.hoursForDay.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

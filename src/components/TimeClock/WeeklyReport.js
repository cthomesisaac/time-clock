import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';
import { Table, Breadcrumb, BreadcrumbItem, ButtonGroup, Button, Container, Row, Col } from 'reactstrap';

import WeeklyTotal from './WeeklyTotal';

export default function WeeklyReport({ currentUser, startDate, setStartDate, endDate, setEndDate, unclockedHours }) {
  /* const [startDate, setStartDate] = useState(dayjs().day(1).toDate());
  const [endDate, setEndDate] = useState(dayjs().day(6).toDate()); */
  // const { records } = useTimeClockRecords('weekly', startDate, endDate);

  return (
    <Container>
      <Row>
        <Col>
          <Breadcrumb>
            <BreadcrumbItem active>Weekly Report</BreadcrumbItem>
          </Breadcrumb>
          <div className="mx-auto mb-1" style={{ width: 'fit-content' }}>
            <span>
              Start Date:
            </span>
            <span>
              <DatePicker selected={startDate} onChange={date => {
                setStartDate(startDate => ({ ...startDate, weekly: date }));
                setEndDate(endDate => ({ ...endDate, weekly: dayjs(date).add(5, 'day').toDate() }));
              }} />
            </span>
            <span>
              End Date:
            </span>
            <span>
              <DatePicker selected={endDate} onChange={date => setEndDate(endDate => ({ ...endDate, weekly: date }))} />
            </span>
          </div>
          <ButtonGroup className="mx-auto d-block mb-1" style={{ width: 'fit-content' }}>
            <Button onClick={() => {
              setStartDate(startDate => ({ ...startDate, weekly: dayjs().startOf('day').day(1).toDate() }));
              setEndDate(endDate => ({ ...endDate, weekly: dayjs().endOf('day').day(6).toDate() }));
            }}>
              Current week
            </Button>
            <Button onClick={() => {
              setStartDate(startDate => ({ ...startDate, weekly: dayjs().startOf('day').day(1).subtract(7, 'd').toDate() }));
              setEndDate(endDate => ({ ...endDate, weekly: dayjs().endOf('day').day(1).subtract(2, 'd').toDate() }));
            }}>
              Last week
            </Button>
            <Button onClick={() => {
              setStartDate(startDate => ({ ...startDate, weekly: dayjs().startOf('day').day(1).subtract(14, 'd').toDate() }));
              setEndDate(endDate => ({ ...endDate, weekly: dayjs().endOf('day').day(1).subtract(9, 'd').toDate() }));
            }}>
              2 weeks ago
            </Button>
            <Button onClick={() => {
              setStartDate(startDate => ({ ...startDate, weekly: dayjs().startOf('day').day(1).subtract(21, 'd').toDate() }));
              setEndDate(endDate => ({ ...endDate, weekly: dayjs().endOf('day').day(1).subtract(16, 'd').toDate() }));
            }}>
              3 weeks ago
            </Button>
            <Button onClick={() => {
              setStartDate(startDate => ({ ...startDate, weekly: dayjs().startOf('day').day(1).subtract(28, 'd').toDate() }));
              setEndDate(endDate => ({ ...endDate, weekly: dayjs().endOf('day').day(1).subtract(23, 'd').toDate() }));
            }}>
              4 weeks ago
            </Button>
          </ButtonGroup>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Total Hours</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Link to="/dashboard/user">
                    {currentUser.profile.name}
                  </Link>
                </td>
                <td>
                  <WeeklyTotal startDate={startDate} endDate={endDate} userId={currentUser.id} unclockedHours={unclockedHours} />
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

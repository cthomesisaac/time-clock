import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { Table, Container, Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';

import { useTimeClockRecords } from '../useTimeClockRecords';
import DailyTotal from './DailyTotal';

export default function EmbeddedDailyReport({ currentUser, records, dailyTotal, date = dayjs().startOf('day') }) {
  const { dateFromParams } = useParams();
  if (dateFromParams) date = dayjs(parseInt(dateFromParams)).startOf('day');
  const [startDate] = useState(date.startOf('day').toDate());
  const [endDate] = useState(date.startOf('day').add(24, 'hour').toDate());
  // const { records, dailyTotal } = useTimeClockRecords('daily', startDate, endDate, currentUser.id);

  return (
    <Container>
      <Row>
        <Col>
          {dateFromParams ? (
            <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/dashboard/weekly">Weekly Report</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to="/dashboard/user">User Report</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Daily Report</BreadcrumbItem>
          </Breadcrumb>
          ) : null}
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
              <div className="ml-3">
                {/* Total Hours: <DailyTotal startDate={startDate} endDate={endDate} currentUser={currentUser} altValue={dailyTotal} /> */}
                Total Hours: {dailyTotal}
              </div>
            </>
          ) : (
              <div>No records for today</div>
            )}
        </Col>
      </Row>
    </Container>
  );
}
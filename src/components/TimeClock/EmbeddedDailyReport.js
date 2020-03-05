import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import dayjs from 'dayjs';
import moment from 'moment';
import { Table, Container, Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';

export default function EmbeddedDailyReport({ currentUser, records, dailyTotal, date = dayjs().startOf('day'), hasClockedIn, unclockedHours }) {
  const { dateFromParams } = useParams();
  if (dateFromParams) date = dayjs(parseInt(dateFromParams)).startOf('day');
  const [startDate] = useState(date.startOf('day').toDate());
  const hours = Math.floor(moment.duration(dailyTotal + unclockedHours, 'h').asHours()) % moment.duration(dailyTotal + unclockedHours, 'h').asHours();
  const minutes = moment.duration(moment.duration(dailyTotal + unclockedHours, 'h').asHours() % Math.floor(moment.duration(dailyTotal + unclockedHours, 'h').asHours()), 'h').asMinutes().toFixed(0);
  // const [endDate] = useState(date.startOf('day').add(24, 'hour').toDate());
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
                {/* Total Hours: <DailyTotal dailyTotal={dailyTotal} hasClockedIn={hasClockedIn} records={records} /> */}
                {/* Total Hours for Today: {parseFloat(dailyTotal + unclockedHours).toFixed(1)} */}
                Total Time for Today: {`${hours} hours ${minutes} minutes`}
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

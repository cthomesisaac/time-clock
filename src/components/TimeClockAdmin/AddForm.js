import React, { useState } from 'react';
import dayjs from 'dayjs';
import DateTimePicker from 'react-datetime-picker/dist/DateTimePicker';
import { Form, FormGroup, Button } from 'reactstrap';

export default function AddForm({ date, addRecord, toggle }) {
  const [record, setRecord] = useState({
    timeIn: new Date(dayjs(parseInt(date)).startOf('day').toDate()),
    timeOut: new Date(dayjs(parseInt(date)).startOf('day').toDate())
  });

  function onChange(value, timeToEdit) {
    if (timeToEdit === 'timeIn') {
      setRecord(record => ({ ...record, timeIn: value }));
    } else if (timeToEdit === 'timeOut') {
      setRecord(record => ({ ...record, timeOut: value }));
    } else {
      console.error(`Unknown timeToEdit: ${timeToEdit}`);
    }
  }

  async function onSubmit(event) {
    event.preventDefault();
    await addRecord(record);
    toggle();
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <div>Time In</div>
        <DateTimePicker value={record.timeIn} onChange={value => onChange(value, 'timeIn')} clearIcon={null} disableClock />
        <div>{record.timeIn.toString()}</div>
      </FormGroup>
      <FormGroup>
        <div>Time Out</div>
        <DateTimePicker value={record.timeOut} onChange={value => onChange(value, 'timeOut')} clearIcon={null} disableClock />
        <div>{record.timeOut.toString()}</div>
      </FormGroup>
      <Button type="submit">Save</Button>
    </Form>
  )
}

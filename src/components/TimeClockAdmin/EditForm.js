import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { Form, FormGroup, Button } from 'reactstrap';

export default function EditForm({ recordToEdit, editRecord, toggle }) {
  const [record, setRecord] = useState(recordToEdit);

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
    await editRecord(record);
    toggle();
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <div>Time In</div>
        <DateTimePicker value={record.timeIn} onChange={value => onChange(value, 'timeIn')} disableClock />
        {/* <div>{record.timeIn.toString()}</div> */}
      </FormGroup>
      <FormGroup>
        <div>Time Out</div>
        <DateTimePicker value={record.timeOut} onChange={value => onChange(value, 'timeOut')} disableClock />
        {/* <div>{record.timeOut.toString()}</div> */}
      </FormGroup>
      <Button type="submit">Save</Button>
    </Form>
  );
}

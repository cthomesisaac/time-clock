import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Form, FormGroup, Button } from 'reactstrap';

export default function AddHolidayForm({ date, addRecord, toggle }) {
  const [holidayDate, setHolidayDate] = useState(new Date(date));

  function onChange(value) {
    setHolidayDate(value);
  }

  async function onSubmit(event) {
    event.preventDefault();
    await addRecord(holidayDate);
    toggle();
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <div>Holiday Date</div>
        <DatePicker selected={date} onChange={onChange} />
      </FormGroup>
      <Button type="submit">Save</Button>
    </Form>
  )
}

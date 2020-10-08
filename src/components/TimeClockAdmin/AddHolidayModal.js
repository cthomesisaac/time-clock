import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

import AddForm from './AddHolidayForm';

export default function AddModal({ date, addRecord }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen(state => !state);
  }
  
  return (
    <>
      <Button color="success" onClick={toggle}>Add Holiday Records</Button>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Add Holiday Records
        </ModalHeader>
        <ModalBody>
          <AddForm date={date} addRecord={addRecord} toggle={toggle} />
        </ModalBody>
      </Modal>
    </>
  );
}

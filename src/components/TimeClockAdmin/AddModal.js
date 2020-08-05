import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

import AddForm from './AddForm';

export default function AddModal({ date, addRecord }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen(state => !state);
  }
  
  return (
    <>
      <Button color="success" className="align-middle mx-1" onClick={toggle}>Add Record</Button>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Add Record
        </ModalHeader>
        <ModalBody>
          <AddForm date={date} addRecord={addRecord} toggle={toggle} />
        </ModalBody>
      </Modal>
    </>
  );
}

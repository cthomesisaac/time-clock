import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

import EditForm from './EditForm';

export default function EditModal({ recordToEdit, editRecord }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen(state => !state);
  }

  return (
    <>
      <Button className="mr-1" onClick={toggle}>Edit</Button>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Record</ModalHeader>
        <ModalBody>
          <EditForm recordToEdit={recordToEdit} editRecord={editRecord} toggle={toggle} />
        </ModalBody>
      </Modal>
    </>
  );
}

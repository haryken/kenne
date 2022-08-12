import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteAssignmentModal = ({
  isShowed,
  handleClose,
  assignmentID,
  onClickDeleteAssignment,
}) => (
  <Modal show={isShowed} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title className="form-header">Are you sure?</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>Do you want to delete this assignment?</p>
      <div className="text-right">
        <Button variant="primary" onClick={() => onClickDeleteAssignment(assignmentID)}>
          Delete
        </Button>
        <Button className="ml-3" variant="light" onClick={handleClose}>
          Cancel
        </Button>
      </div>
    </Modal.Body>
  </Modal>
);

export default DeleteAssignmentModal;

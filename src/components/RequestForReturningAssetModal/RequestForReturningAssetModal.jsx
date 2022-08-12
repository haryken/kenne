import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const RequestForReturningAssetModal = ({
  isShowed,
  handleClose,
  AssignmentDetails,
  onClickRequestForReturningAsset,
}) => (
  <Modal show={isShowed} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title className="text-danger">Are you sure?</Modal.Title>
    </Modal.Header>
    <Modal.Body>Do you want to create a returning request for this asset?</Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={() => onClickRequestForReturningAsset(AssignmentDetails)}>
        Yes
      </Button>
      <Button variant="secondary" onClick={handleClose}>
        No
      </Button>
    </Modal.Footer>
  </Modal>
);

export default RequestForReturningAssetModal;

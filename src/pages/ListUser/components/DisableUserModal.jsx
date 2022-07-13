import React, { useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserDisability } from '../../../actions';
import { createToast } from '../../../utils';

const DisableUserModal = ({ isShowed, handleClose, userID, onClickDisableUser }) => {
  const dispatch = useDispatch();

  const {
    loading,
    error,
    success: canBeDisabled,
  } = useSelector((state) => state.checkUserDisabilityReducer);

  useEffect(() => {
    if (userID) {
      dispatch(checkUserDisability(userID));
    }
  }, [dispatch, userID]);

  if (loading) {
    return <></>;
  }

  if (error) {
    createToast(error, 'error');
    return <></>;
  }

  if (canBeDisabled) {
    return (
      <Modal show={isShowed} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="form-header">Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Do you want to disable this user?</p>
          <div className="text-right">
            <Button variant="primary" onClick={() => onClickDisableUser(userID)}>
              Disable
            </Button>
            <Button className="ml-3" variant="light" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <Modal show={isShowed} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="form-header">Cannot disable user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>There are valid assignments belonging to this user.</p>
        <p>Please close all assignments before disabling user.</p>
      </Modal.Body>
    </Modal>
  );
};

export default DisableUserModal;

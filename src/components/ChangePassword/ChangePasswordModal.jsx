import React from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUserData } from '../../actions';
import ChangePasswordFormFirstTime from './ChangePasswordFormFirstTime';
import ChangePasswordFormNormal from './ChangePasswordFormNormal';

const ChangePasswordModal = ({ isShowed, setShowChangePasswordModal }) => {
  const { userData } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const handleClose = () => {
    setShowChangePasswordModal(false);
    dispatch(getCurrentUserData());
  };

  return (
    <Modal show={isShowed} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {userData && userData.firstTimeLogin ? (
          <ChangePasswordFormFirstTime handleClose={handleClose} />
        ) : (
          <ChangePasswordFormNormal handleClose={handleClose} />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ChangePasswordModal;

import React from 'react';
import { Col, Row, Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../actions';
import './logoutModal.scss';

const LogoutModal = ({ isShowed: show, setShowLogoutModal }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClose = () => {
    setShowLogoutModal(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    setShowLogoutModal(false);
    history.push('/login');
  };

  return (
    <div id="logout-modal">
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        dialogClassName="logout-modal"
      >
        <Modal.Header>
          <Modal.Title className="form-header">Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Do you want to logout?</p>
          <Row>
            <Col sm="6">
              <Button variant="primary" block onClick={handleLogout}>
                Logout
              </Button>
            </Col>
            <Col sm="6">
              <Button variant="light" block onClick={handleClose}>
                Cancel
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LogoutModal;

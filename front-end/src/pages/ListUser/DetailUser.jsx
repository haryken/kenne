import moment from 'moment';
import React, { useState } from 'react';
import { Modal, Col, Row } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';

const UserDetailsModal = ({ isShowed, currentUser }) => {
  const [show, setShow] = useState(isShowed || false);

  const handleClose = () => setShow(false);

  return (
    <div id="user-details-modal">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="form-header">Detailed User Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm="4">
              <b>Staff Code</b>
            </Col>
            <Col sm="8">
              <p className="staff-code">{currentUser.staffCode}</p>
            </Col>
          </Row>

          <Row>
            <Col sm="4">
              <b>Full Name</b>
            </Col>
            <Col sm="8">
              <p
                data-tip
                data-for="fullNameTooltip"
                className="specification truncate pointer full-name"
              >
                {currentUser.firstName} {currentUser.lastName}
              </p>
              <ReactTooltip place="bottom" type="dark" id="fullNameTooltip">
                <span>
                  {currentUser.firstName} {currentUser.lastName}
                </span>
              </ReactTooltip>
            </Col>
          </Row>

          <Row>
            <Col sm="4">
              <b>Username</b>
            </Col>
            <Col sm="8">
              <p
                data-tip
                data-for="usernameTooltip"
                className="specification truncate pointer username"
              >
                {currentUser.username}
              </p>
              <ReactTooltip place="bottom" type="dark" id="usernameTooltip">
                <span>{currentUser.username}</span>
              </ReactTooltip>
            </Col>
          </Row>

          <Row>
            <Col sm="4">
              <b>Date of Birth</b>
            </Col>
            <Col sm="8">
              <p className="date-of-birth">
                {moment(currentUser.dateOfBirth).format('DD/MM/YYYY')}
              </p>
            </Col>
          </Row>

          <Row>
            <Col sm="4">
              <b>Gender</b>
            </Col>
            <Col sm="8">
              <p className="gender">{currentUser.gender}</p>
            </Col>
          </Row>

          <Row>
            <Col sm="4">
              <b>Joined Date</b>
            </Col>
            <Col sm="8">
              <p className="joined-date">{moment(currentUser.joinedDate).format('DD/MM/YYYY')}</p>
            </Col>
          </Row>

          <Row>
            <Col sm="4">
              <b>Type</b>
            </Col>
            <Col sm="8">
              <p className="type">{currentUser.userType}</p>
            </Col>
          </Row>

          <Row>
            <Col sm="4">
              <b>Location</b>
            </Col>
            <Col sm="8">
              <p className="location">{currentUser.userLocation}</p>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserDetailsModal;

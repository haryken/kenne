import React from 'react';
import { Modal, Col, Row } from 'react-bootstrap';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';
import { enumAssignmentStateLowerCase } from '../../../utils';

const AssignmentDetail = ({ isShowed, currentAssignment, handleClose }) => {
  if (!currentAssignment) {
    return <></>;
  }
  return (
    <div id="assignment-details-modal">
      <Modal show={isShowed} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="form-header">Detailed Assignment Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm="4">
              <b>Asset Code</b>
            </Col>
            <Col sm="8">
              <p className="asset-code">{currentAssignment.Asset.assetCode}</p>
            </Col>
          </Row>

          <Row>
            <Col sm="4">
              <b>Asset Name</b>
            </Col>
            <Col sm="8">
              <p data-tip data-for="assetNameTooltip" className="asset-name truncate pointer">
                {currentAssignment.Asset.assetName}
              </p>
              <ReactTooltip place="bottom" type="dark" id="assetNameTooltip">
                <span>{currentAssignment.Asset.assetName}</span>
              </ReactTooltip>
            </Col>
          </Row>

          <Row>
            <Col sm="4">
              <b>Specification</b>
            </Col>
            <Col sm="8">
              <p data-tip data-for="assetSpecTooltip" className="specification truncate pointer">
                {currentAssignment.Asset.assetSpec}
              </p>
              <ReactTooltip place="bottom" type="dark" id="assetSpecTooltip">
                <span>{currentAssignment.Asset.assetSpec}</span>
              </ReactTooltip>
            </Col>
          </Row>

          <Row>
            <Col sm="4">
              <b>Assigned To</b>
            </Col>
            <Col sm="8">
              <p className="assigned-to">{currentAssignment.Assigned_To.username}</p>
            </Col>
          </Row>

          <Row>
            <Col sm="4">
              <b>Assigned By</b>
            </Col>
            <Col sm="8">
              <p className="assigned-by">{currentAssignment.Assigned_By.username}</p>
            </Col>
          </Row>

          <Row>
            <Col sm="4">
              <b>Assigned Date</b>
            </Col>
            <Col sm="8">
              <p className="assigned-date">
                {moment(currentAssignment.assignedDate).format('DD/MM/YYYY')}
              </p>
            </Col>
          </Row>

          <Row>
            <Col sm="4">
              <b>State</b>
            </Col>
            <Col sm="8">
              <p className="state">
                {enumAssignmentStateLowerCase[currentAssignment.assignmentState]}
              </p>
            </Col>
          </Row>

          <Row>
            <Col sm="4">
              <b>Note</b>
            </Col>
            <Col sm="8">
              <p data-tip data-for="assignmentNoteTooltip" className="note truncate pointer">
                {currentAssignment.note ? currentAssignment.note : 'N/A'}
              </p>
              <ReactTooltip place="bottom" type="dark" id="assignmentNoteTooltip">
                <span>{currentAssignment.note ? currentAssignment.note : 'N/A'}</span>
              </ReactTooltip>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AssignmentDetail;

import React from 'react';
import { Modal, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';
import AssetAssignmentHistoryTable from './AssetAssignmentHistoryTable';

const AssetDetailsModal = ({ selectedAssetDetails, isShowed, handleClose }) => {
  if (!selectedAssetDetails) {
    return <></>;
  }

  const { id, assetCode, assetName, Category, installedDate, state, assetLocation, assetSpec } =
    selectedAssetDetails;

  return (
    <Modal dialogClassName="asset-details-modal" show={isShowed} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="form-header">Detailed Asset Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-3">
          <Col sm="3">
            <b>Asset Code</b>
          </Col>
          <Col sm="9">
            <p>{assetCode}</p>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm="3">
            <b>Asset Name</b>
          </Col>
          <Col sm="9">
            <p data-tip data-for="assetNameTooltip" className="specification truncate pointer">
              {assetName}
            </p>
            <ReactTooltip place="bottom" type="dark" id="assetNameTooltip">
              <span>{assetName}</span>
            </ReactTooltip>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm="3">
            <b>Category</b>
          </Col>
          <Col sm="9">
            <p>{Category.categoryName}</p>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm="3">
            <b>Installed Date</b>
          </Col>
          <Col sm="9">
            <p>{moment(installedDate).format('DD/MM/yyyy')}</p>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm="3">
            <b>State</b>
          </Col>
          <Col sm="9">
            <p>{state}</p>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm="3">
            <b>Location</b>
          </Col>
          <Col sm="9">
            <p>{assetLocation}</p>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm="3">
            <b>Specification</b>
          </Col>
          <Col sm="9">
            <p data-tip data-for="assetSpecTooltip" className="specification truncate pointer">
              {assetSpec}
            </p>
            <ReactTooltip place="bottom" type="dark" id="assetSpecTooltip">
              <span>{assetSpec}</span>
            </ReactTooltip>
          </Col>
        </Row>

        <Row>
          <Col sm="3">
            <b>History</b>
          </Col>
          <Col sm="9">
            <AssetAssignmentHistoryTable assetID={id} />
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default AssetDetailsModal;

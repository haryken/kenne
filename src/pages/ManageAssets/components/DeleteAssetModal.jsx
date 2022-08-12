import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const DeleteAssetModal = ({ isShowed, handleClose, assetID, onClickDeleteAsset }) => {
  const history = useHistory();
  const { loading, error } = useSelector((state) => state.deleteAssetReducer);

  if (loading) {
    return <></>;
  }

  if (!error) {
    return (
      <Modal show={isShowed} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="form-header">Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Do you want to delete this asset?</p>
          <div className="text-right">
            <Button variant="primary" onClick={() => onClickDeleteAsset(assetID)}>
              Delete
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
        <Modal.Title className="form-header">Cannot Delete Asset</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{error}</p>
        <p>
          If the asset is not able to be used anymore, please update its state in{' '}
          <span
            className="hyper-link"
            to={`/assets/edit/${assetID}`}
            onClick={() => {
              handleClose();
              history.push(`/assets/edit/${assetID}`);
            }}
            role="presentation"
          >
            Edit Asset Page
          </span>
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteAssetModal;

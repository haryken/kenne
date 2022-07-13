import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Row, Col, Table, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { BsFillCaretUpFill, BsFillCaretDownFill } from 'react-icons/bs';
import { ImCheckmark, ImCross, ImSpinner11 } from 'react-icons/im';
import { Paginator } from '../../components/Paginator';
import {
  assignmentTableHeaderShorter,
  enumAssignmentStateLowerCase,
  enumAssignmentState,
  createToast,
} from '../../utils';
import {
  changeStatusAssignment,
  findOwnAssignment,
  createRequestForReturningAsset,
  setHeaderTitle,
} from '../../actions';
import { AssignmentDetail } from './component';
import { RequestForReturningAssetModal } from '../../components/RequestForReturningAssetModal';

const ViewOwnAssignment = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmittedCreateRequest, setIsSubmittedCreateRequest] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [page, setPage] = useState(1);
  const [selectedAssignmentDetails, setSelectedAssignmentDetails] = useState(null);
  const [sortCriteria, setSortCriteria] = useState({
    sortBy: 'assetCode',
    order: 'ASC',
  });
  const { loading, assignments, assignmentPageObject } = useSelector(
    (state) => state.findOwnAssignmentReducer
  );
  const { errorChangeStatus, loadingChangeState } = useSelector(
    (state) => state.changeStatusAssignmentReducer
  );

  const { loadingRequestForReturningAsset, errorRequestForReturningAsset } = useSelector(
    (state) => state.createRequestForReturningAssetReducer
  );

  const [showModalAccept, setShowModalAccept] = useState(false);
  const [showModalDecline, setShowModalDecline] = useState(false);
  const [showModalRequestForReturningAsset, setShowModalRequestForReturningAsset] = useState(false);

  const handleCloseModalAccept = () => setShowModalAccept(false);
  const handleShowModalAccept = () => setShowModalAccept(true);
  const handleCloseModalDecline = () => setShowModalDecline(false);
  const handleShowModalDecline = () => setShowModalDecline(true);
  const handleCloseModalRequestForReturningAsset = () =>
    setShowModalRequestForReturningAsset(false);
  const handleShowModalRequestForReturningAsset = () => setShowModalRequestForReturningAsset(true);

  useEffect(() => {
    dispatch(setHeaderTitle(['Home']));
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      findOwnAssignment({
        ...sortCriteria,
        page,
      })
    );
  }, [sortCriteria, dispatch, page]);

  useEffect(() => {
    if (isSubmitted) {
      if (!loadingChangeState) {
        if (errorChangeStatus) {
          createToast(errorChangeStatus, 'error');
        }
        dispatch(
          findOwnAssignment({
            ...sortCriteria,
            page,
          })
        );
        setIsSubmitted(false);
      }
    }
  }, [loadingChangeState, errorChangeStatus, isSubmitted]);

  useEffect(() => {
    if (isSubmittedCreateRequest) {
      if (!loadingRequestForReturningAsset) {
        if (errorRequestForReturningAsset) {
          createToast(errorRequestForReturningAsset, 'error');
        }
        dispatch(
          findOwnAssignment({
            ...sortCriteria,
            page,
          })
        );
        setIsSubmittedCreateRequest(false);
      }
    }
  }, [loadingRequestForReturningAsset, errorRequestForReturningAsset, isSubmittedCreateRequest]);

  const handlePageChange = (pageNumber) => setPage(pageNumber);

  const onChangeSortCriteria = (sortBy) => {
    if (sortCriteria.sortBy === sortBy) {
      return setSortCriteria({
        ...sortCriteria,
        sortBy,
        order: sortCriteria.order === 'ASC' ? 'DESC' : 'ASC',
      });
    }

    return setSortCriteria({
      ...sortCriteria,
      sortBy,
      order: 'ASC',
    });
  };

  const handleAccept = (selectedItem) => {
    if (selectedItem) {
      setIsSubmitted(true);
      dispatch(changeStatusAssignment(selectedItem.id, enumAssignmentState.ACCEPTED));
      handleCloseModalAccept();
    }
  };

  const handleDecline = (selectedItem) => {
    if (selectedItem) {
      setIsSubmitted(true);
      dispatch(changeStatusAssignment(selectedItem.id, enumAssignmentState.DECLINED));
      handleCloseModalDecline();
    }
  };

  const handleRequestForReturningAsset = (selectedItem) => {
    if (selectedItem) {
      setIsSubmittedCreateRequest(true);
      dispatch(createRequestForReturningAsset(selectedItem.id));
      handleCloseModalRequestForReturningAsset();
    }
  };

  const renderActionButtons = (assignmentItem) => {
    const { assignmentState } = assignmentItem;
    if (assignmentState === enumAssignmentState.WAITING_FOR_ACCEPTANCE) {
      return (
        <>
          <Button
            onClick={() => {
              setSelectedAssignmentDetails(assignmentItem);
              handleShowModalAccept();
            }}
            variant="light"
            className="ml-1"
          >
            <ImCheckmark className="edit-icon" style={{ color: 'green' }} />
          </Button>
          <Button
            onClick={() => {
              setSelectedAssignmentDetails(assignmentItem);
              handleShowModalDecline();
            }}
            variant="light"
            className="ml-1"
          >
            <ImCross className="delete-icon" />
          </Button>
          <Button variant="light" className="ml-1" disabled>
            <ImSpinner11 className="recycle-icon" />
          </Button>
        </>
      );
    }
    if (assignmentState === enumAssignmentState.ACCEPTED) {
      return (
        <>
          <Button variant="light" disabled>
            <ImCheckmark className="edit-icon" />
          </Button>
          <Button variant="light" className="ml-1" disabled>
            <ImCross />
          </Button>
          <Button
            onClick={() => {
              setSelectedAssignmentDetails(assignmentItem);
              handleShowModalRequestForReturningAsset();
            }}
            variant="light"
            className="ml-1"
          >
            <ImSpinner11 className="recycle-icon" style={{ color: 'blue' }} />
          </Button>
        </>
      );
    }
    return (
      <>
        <Button variant="light" disabled>
          <ImCheckmark className="edit-icon" />
        </Button>
        <Button variant="light" className="ml-1" disabled>
          <ImCross />
        </Button>
        <Button variant="light" className="ml-1" disabled>
          <ImSpinner11 className="recycle-icon" />
        </Button>
      </>
    );
  };

  const renderTableHeaders = () =>
    assignmentTableHeaderShorter.map((tableHeader, index) => {
      if (sortCriteria.sortBy === tableHeader.sortBy) {
        return (
          <th
            className={`sort-table-header-${index.toString()} sort-table-header active`}
            onClick={() => onChangeSortCriteria(tableHeader.sortBy)}
          >
            {tableHeader.name}

            {sortCriteria.order === 'ASC' ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />}
          </th>
        );
      }
      return (
        <th
          className={`sort-table-header-${index.toString()} sort-table-header`}
          onClick={() => onChangeSortCriteria(tableHeader.sortBy)}
        >
          {tableHeader.name}
          <BsFillCaretUpFill />
        </th>
      );
    });

  const renderAssigmentList = () =>
    assignments.map((assignment) => (
      <>
        <tr className="row-data" key={assignment.id}>
          <td
            style={{ cursor: 'pointer' }}
            className="popup-button"
            onClick={() => {
              handleShow();
              setSelectedAssignmentDetails(assignment);
            }}
            role="presentation"
          >
            {assignment.Asset.assetCode}
          </td>
          <td
            className="popup-button pointer"
            style={{ maxWidth: '130px' }}
            onClick={() => {
              handleShow();
              setSelectedAssignmentDetails(assignment);
            }}
            role="presentation"
          >
            <span className="truncate">{assignment.Asset.assetName}</span>
          </td>
          <td>{assignment.Assigned_To.username}</td>
          <td>{assignment.Assigned_By.username}</td>
          <td>{moment(assignment.assignedDate).format('DD/MM/YYYY')}</td>
          <td>{enumAssignmentStateLowerCase[assignment.assignmentState]}</td>
          <td className="edit-delete">{renderActionButtons(assignment)}</td>
        </tr>
      </>
    ));

  const renderAssignmentTable = () => {
    if (loading) {
      return <h2>Loading...</h2>;
    }

    if (assignments.length === 0) {
      return <h2>No data</h2>;
    }

    return (
      <Table responsive className="assignment-table own-assignment-table">
        <thead>
          <tr>{renderTableHeaders()}</tr>
        </thead>
        <tbody>{renderAssigmentList()}</tbody>
      </Table>
    );
  };

  return (
    <div>
      <h2 className="form-header">My Assignment</h2>
      <Row>
        <Col md="12" className="table-user-list">
          {renderAssignmentTable()}
        </Col>
      </Row>
      <Paginator pageObject={assignmentPageObject} onChangePageNumber={handlePageChange} toTop />
      <AssignmentDetail
        isShowed={show}
        currentAssignment={selectedAssignmentDetails}
        handleClose={handleClose}
      />

      {/* Modal Accept Assignment */}
      <Modal show={showModalAccept} onHide={handleCloseModalAccept}>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to accept this assignment?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleAccept(selectedAssignmentDetails)}>
            Accept
          </Button>
          <Button variant="secondary" onClick={handleCloseModalAccept}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Decline Assignment */}
      <Modal show={showModalDecline} onHide={handleCloseModalDecline}>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to decline this assignment?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleDecline(selectedAssignmentDetails)}>
            Decline
          </Button>
          <Button variant="secondary" onClick={handleCloseModalDecline}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <RequestForReturningAssetModal
        isShowed={showModalRequestForReturningAsset}
        handleClose={handleCloseModalRequestForReturningAsset}
        AssignmentDetails={selectedAssignmentDetails}
        onClickRequestForReturningAsset={handleRequestForReturningAsset}
      />
    </div>
  );
};

export default ViewOwnAssignment;

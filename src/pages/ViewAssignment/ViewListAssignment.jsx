import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { Row, InputGroup, FormControl, Button, Col, Table } from 'react-bootstrap';
import Popup from 'reactjs-popup';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { BsSearch, BsFillCaretUpFill, BsFillCaretDownFill } from 'react-icons/bs';
import { ImCancelCircle, ImSpinner11, ImPencil } from 'react-icons/im';
import { Paginator } from '../../components/Paginator';
import {
  findAssignment,
  setHeaderTitle,
  removeStoreAssignment,
  deleteAssignment,
  createRequestForReturningAsset,
} from '../../actions';
import { AssignmentStateDropdown, AssignmentDetail, DeleteAssignmentModal } from './component';
import {
  assignmentTableHeaders,
  createToast,
  enumAssignmentState,
  enumAssignmentStateLowerCase,
  isObjectEmpty,
} from '../../utils';
import { RequestForReturningAssetModal } from '../../components/RequestForReturningAssetModal';

const ViewListAssignment = () => {
  const dispatch = useDispatch();
  const searchInput = useRef(null);

  const [deleteAssignmentID, setDeleteAssignmentID] = useState(null);
  const [disableModalShow, setDisableModalShow] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmittedCreateRequest, setIsSubmittedCreateRequest] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [condition, setCondition] = useState({});
  const [typeState, setTypeState] = useState(enumAssignmentState.ALL);
  const [showModalRequestForReturningAsset, setShowModalRequestForReturningAsset] = useState(false);
  const [selectedAssignmentDetails, setSelectedAssignmentDetails] = useState(null);
  const [sortCriteria, setSortCriteria] = useState({
    sortBy: 'id',
    order: 'ASC',
  });
  const [valueDate, setValueDate] = useState('');
  const handleCloseModalRequestForReturningAsset = () =>
    setShowModalRequestForReturningAsset(false);
  const handleShowModalRequestForReturningAsset = () => setShowModalRequestForReturningAsset(true);

  const { assignment: storedAssignment } = useSelector((state) => state.storeAssignmentReducer);
  const { loading, assets, assetPageObject } = useSelector((state) => state.findAssignmentReducer);
  const { loading: deleteAssignmentLoading, error: deleteAssignmentError } = useSelector(
    (state) => state.deleteAssignmentReducer
  );
  const { loadingRequestForReturningAsset, errorRequestForReturningAsset } = useSelector(
    (state) => state.createRequestForReturningAssetReducer
  );

  const handleCloseDeleteAssignmentModal = () => {
    setDisableModalShow(false);
  };

  useEffect(() => {
    if (isSubmitted) {
      if (!deleteAssignmentLoading) {
        if (!deleteAssignmentError) {
          dispatch(
            findAssignment({
              ...condition,
              ...sortCriteria,
              assignedDate: valueDate ? moment(valueDate).format('YYYY-MM-DD') : undefined,
            })
          );
          dispatch(removeStoreAssignment());
          handleCloseDeleteAssignmentModal();
        } else {
          createToast(deleteAssignmentError, 'error');
        }
        setIsSubmitted(false);
      }
    }
  }, [isSubmitted, deleteAssignmentLoading, deleteAssignmentError]);

  useEffect(() => {
    if (setIsSubmittedCreateRequest) {
      if (!loadingRequestForReturningAsset) {
        if (errorRequestForReturningAsset) {
          createToast(errorRequestForReturningAsset, 'error');
        }
        dispatch(
          findAssignment({
            ...condition,
            ...sortCriteria,
            assignedDate: valueDate ? moment(valueDate).format('YYYY-MM-DD') : undefined,
          })
        );
        setIsSubmittedCreateRequest(false);
      }
    }
  }, [loadingRequestForReturningAsset, errorRequestForReturningAsset, isSubmittedCreateRequest]);

  useEffect(() => {
    dispatch(setHeaderTitle(['Manage Assignment']));
  }, [dispatch]);

  useEffect(() => {
    if (
      typeState !== enumAssignmentState.ALL ||
      sortCriteria.sortBy !== 'id' ||
      sortCriteria.order !== 'ASC' ||
      !isObjectEmpty(condition) ||
      valueDate
    ) {
      dispatch(removeStoreAssignment());
    }
    dispatch(
      findAssignment({
        ...condition,
        ...sortCriteria,
        assignedDate: valueDate ? moment(valueDate).format('YYYY-MM-DD') : undefined,
      })
    );
  }, [condition, sortCriteria, valueDate]);

  const handleChangeDate = (value) => {
    setValueDate(value);
  };

  const onShowDeleteAssignmentModal = (assignmentID) => {
    setDisableModalShow(true);
    setDeleteAssignmentID(assignmentID);
  };

  const onClickDeleteAssignment = (assignmentID) => {
    dispatch(deleteAssignment(assignmentID));
    setIsSubmitted(true);
  };

  const handleRequestForReturningAsset = (selectedItem) => {
    if (selectedItem) {
      setIsSubmittedCreateRequest(true);
      dispatch(createRequestForReturningAsset(selectedItem.id));
      handleCloseModalRequestForReturningAsset();
    }
  };

  const renderActionButtons = (assignmentItem) => {
    const { assignmentState, assignedDate } = assignmentItem;
    const disableEditButton =
      new Date(assignedDate).setHours(0, 0, 0, 0) <= new Date().setHours(0, 0, 0, 0);

    if (assignmentState === enumAssignmentState.WAITING_FOR_ACCEPTANCE) {
      return (
        <>
          <Link
            to={`/assignments/edit/${assignmentItem.id}`}
            className={`btn btn-light ${disableEditButton ? 'disabled' : ''}`}
          >
            <ImPencil className="edit-icon" style={{ opacity: disableEditButton ? 0.7 : 1 }} />
          </Link>
          <Button
            variant="light"
            className="ml-1"
            onClick={() => {
              onShowDeleteAssignmentModal(assignmentItem.id);
            }}
          >
            <ImCancelCircle className="delete-icon" />
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
            <ImPencil className="edit-icon" style={{ opacity: 0.7 }} />
          </Button>
          <Button variant="light" className="ml-1" disabled>
            <ImCancelCircle />
          </Button>
          <Button
            variant="light"
            className="ml-1"
            onClick={() => {
              setSelectedAssignmentDetails(assignmentItem);
              handleShowModalRequestForReturningAsset();
            }}
          >
            <ImSpinner11 className="recycle-icon" style={{ color: 'blue' }} />
          </Button>
        </>
      );
    }
    if (assignmentState === enumAssignmentState.DECLINED) {
      return (
        <>
          <Button variant="light" disabled>
            <ImPencil className="edit-icon" style={{ opacity: 0.7 }} />
          </Button>
          <Button
            variant="light"
            className="ml-1"
            onClick={() => {
              onShowDeleteAssignmentModal(assignmentItem.id);
            }}
          >
            <ImCancelCircle className="delete-icon" />
          </Button>
          <Button variant="light" className="ml-1" disabled>
            <ImSpinner11 className="recycle-icon" />
          </Button>
        </>
      );
    }
    return (
      <>
        <Button variant="light" disabled>
          <ImPencil className="edit-icon" style={{ opacity: 0.7 }} />
        </Button>
        <Button variant="light" className="ml-1" disabled>
          <ImCancelCircle />
        </Button>
        <Button variant="light" className="ml-1" disabled>
          <ImSpinner11 className="recycle-icon" />
        </Button>
      </>
    );
  };

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
  const renderTableHeaders = () =>
    assignmentTableHeaders.map((tableHeader, index) => {
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
  const handlePageChange = (pageNumber) => setCondition({ ...condition, page: pageNumber });
  const handleChangeSearch = () => {
    setSearchText(searchInput.current.value);
  };
  const renderSearchBar = () => (
    <InputGroup className="mb-3">
      <FormControl
        placeholder="Search"
        value={searchText}
        ref={searchInput}
        onChange={handleChangeSearch}
      />

      <Button
        variant="secondary"
        onClick={() => {
          setCondition({
            ...condition,
            search: searchText,
          });
        }}
      >
        <BsSearch />
      </Button>
    </InputGroup>
  );

  const onChangeState = (stateItem) => {
    setTypeState(stateItem);
    setValueDate('');
    setSearchText('');
    return setCondition({
      state: stateItem,
    });
  };

  const renderAssigmentList = () => {
    let assetList = assets;

    if (storedAssignment) {
      assetList = [
        storedAssignment,
        ...assets.filter((assetItem) => assetItem.id !== storedAssignment.id),
      ];
    }
    return assetList.map((assignment) => (
      <>
        <tr className="row-data" key={assignment.id}>
          <Popup modal trigger={<td className="popup-button pointer">{assignment.id}</td>}>
            <AssignmentDetail isShowed currentAssignment={assignment} />
          </Popup>
          <Popup
            modal
            trigger={<td className="popup-button pointer">{assignment.Asset.assetCode}</td>}
          >
            <AssignmentDetail isShowed currentAssignment={assignment} />
          </Popup>
          <Popup
            modal
            trigger={
              <td style={{ maxWidth: '130px' }}>
                <span className="popup-button truncate pointer">{assignment.Asset.assetName}</span>
              </td>
            }
          >
            <AssignmentDetail isShowed currentAssignment={assignment} />
          </Popup>
          <td>{assignment.Assigned_To.username}</td>
          <td>{assignment.Assigned_By.username}</td>
          <td>{moment(assignment.assignedDate).format('DD/MM/YYYY')}</td>
          <td>{enumAssignmentStateLowerCase[assignment.assignmentState]}</td>
          <td className="edit-delete">{renderActionButtons(assignment)}</td>
        </tr>
      </>
    ));
  };

  const renderAssignmentTable = () => {
    if (loading) {
      return <h2>Loading...</h2>;
    }

    if (assets.length === 0) {
      return <h2>No data</h2>;
    }

    return (
      <Table responsive className="assignment-table">
        <thead>
          <tr>{renderTableHeaders()}</tr>
        </thead>
        <tbody>{renderAssigmentList()}</tbody>
      </Table>
    );
  };

  return (
    <div>
      <h2 className="form-header">Assignment List</h2>
      <Row>
        <Col>
          <AssignmentStateDropdown selectedState={typeState} onChangeState={onChangeState} />
        </Col>
        <Col>
          <DatePicker
            className="form-control"
            id="assignment-date"
            onChange={handleChangeDate}
            selected={valueDate}
            dateFormat="dd/MM/yyyy"
            placeholderText="Assigned Date"
          />
        </Col>
        <Col>{renderSearchBar()}</Col>
        <Col sm="3">
          <Link
            to="/assignments/create"
            className="btn btn-primary btn-block"
            style={{ fontSize: '0.95rem' }}
          >
            Create New Assignment
          </Link>
        </Col>
      </Row>
      <Row>
        <Col md="12" className="table-user-list">
          {renderAssignmentTable()}
        </Col>
      </Row>
      <Paginator pageObject={assetPageObject} onChangePageNumber={handlePageChange} toTop />

      <DeleteAssignmentModal
        isShowed={disableModalShow}
        handleClose={handleCloseDeleteAssignmentModal}
        assignmentID={deleteAssignmentID}
        onClickDeleteAssignment={onClickDeleteAssignment}
      />
      <RequestForReturningAssetModal
        isShowed={showModalRequestForReturningAsset}
        handleClose={handleCloseModalRequestForReturningAsset}
        AssignmentDetails={selectedAssignmentDetails}
        onClickRequestForReturningAsset={handleRequestForReturningAsset}
      />
    </div>
  );
};

export default ViewListAssignment;

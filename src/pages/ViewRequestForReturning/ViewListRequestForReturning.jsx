import React, { useRef, useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { Row, InputGroup, FormControl, Button, Col, Table, Modal } from 'react-bootstrap';
import Popup from 'reactjs-popup';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { BsSearch, BsFillCaretUpFill, BsFillCaretDownFill } from 'react-icons/bs';
import { ImCheckmark, ImCross } from 'react-icons/im';
import { Paginator } from '../../components/Paginator';
import {
  findAssignment,
  setHeaderTitle,
  completeReturningRequest,
  cancelReturningRequest,
} from '../../actions';
import { RequestForReturningStateDropdown, AssignmentDetail } from './component';
import {
  requestForReturningTableHeaders,
  enumAssignmentState,
  enumAssignmentStateLowerCase,
  isObjectEmpty,
  createToast,
} from '../../utils';

const ViewListRequestForReturning = () => {
  const dispatch = useDispatch();
  const searchInput = useRef(null);

  const [searchText, setSearchText] = useState([]);
  const [condition, setCondition] = useState({
    state: `${enumAssignmentState.COMPLETED},${enumAssignmentState.WAITING_FOR_RETURNING}`,
  });
  const [typeState, setTypeState] = useState(enumAssignmentState.ALL);
  const [sortCriteria, setSortCriteria] = useState({
    sortBy: 'id',
    order: 'ASC',
  });
  const [valueDate, setValueDate] = useState('');
  const { loading, assets, assetPageObject } = useSelector((state) => state.findAssignmentReducer);
  const [selectedAssignmentDetails, setSelectedAssignmentDetails] = useState(null);
  const [showModalComplete, setshowModalComplete] = useState(false);
  const [showModalCancel, setshowModalCancel] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmittedCancel, setIsSubmittedCancel] = useState(false);
  const { errorCompleteReturningRequest, loadingCompleteReturningRequest } = useSelector(
    (state) => state.completeReturningRequestReducer
  );
  const { errorCancelReturningRequest, loadingCancelReturningRequest } = useSelector(
    (state) => state.cancelReturningRequestReducer
  );
  const handleCloseModalComplete = () => setshowModalComplete(false);
  const handleShowModalComplete = () => setshowModalComplete(true);

  const handleCloseModalCancel = () => setshowModalCancel(false);
  const handleShowModalCancel = () => setshowModalCancel(true);

  useEffect(() => {
    dispatch(setHeaderTitle(['Request for Returning']));
  }, [dispatch]);

  useEffect(() => {
    if (
      typeState !== enumAssignmentState.ALL ||
      sortCriteria.sortBy !== 'id' ||
      sortCriteria.order !== 'ASC' ||
      !isObjectEmpty(condition) ||
      valueDate
    )
      dispatch(
        findAssignment({
          ...condition,
          ...sortCriteria,
          returnedDate: valueDate ? moment(valueDate).format('YYYY-MM-DD') : undefined,
        })
      );
  }, [condition, sortCriteria, valueDate]);

  const handleChangeDate = (value) => {
    setValueDate(value);
  };

  useEffect(() => {
    if (isSubmitted) {
      if (!loadingCompleteReturningRequest) {
        if (errorCompleteReturningRequest) {
          createToast(errorCompleteReturningRequest, 'error');
        }
        dispatch(
          findAssignment({
            ...condition,
            ...sortCriteria,
            returnedDate: valueDate ? moment(valueDate).format('YYYY-MM-DD') : undefined,
          })
        );
        setIsSubmitted(false);
      }
    }
  }, [errorCompleteReturningRequest, loadingCompleteReturningRequest, isSubmitted]);

  useEffect(() => {
    if (isSubmittedCancel) {
      if (!loadingCancelReturningRequest) {
        if (errorCancelReturningRequest) {
          createToast(errorCancelReturningRequest, 'error');
        }
        dispatch(
          findAssignment({
            ...condition,
            ...sortCriteria,
            returnedDate: valueDate ? moment(valueDate).format('YYYY-MM-DD') : undefined,
          })
        );
        setIsSubmittedCancel(false);
      }
    }
  }, [errorCancelReturningRequest, loadingCancelReturningRequest, isSubmittedCancel]);

  const handleComplete = (selectedItem) => {
    if (selectedItem) {
      dispatch(completeReturningRequest(selectedItem.id));
      setIsSubmitted(true);
      handleCloseModalComplete();
    }
  };

  const handleCancelRequestForReturning = (selectedItem) => {
    if (selectedItem) {
      dispatch(cancelReturningRequest(selectedItem.id));
      setIsSubmittedCancel(true);
      handleCloseModalCancel();
    }
  };

  const renderActionButtons = (assignmentItem) => {
    const { assignmentState } = assignmentItem;
    if (assignmentState === enumAssignmentState.WAITING_FOR_RETURNING) {
      return (
        <>
          <Button
            variant="light"
            className="ml-1"
            onClick={() => {
              setSelectedAssignmentDetails(assignmentItem);
              handleShowModalComplete();
            }}
          >
            <ImCheckmark className="edit-icon" style={{ color: 'green' }} />
          </Button>
          <Button
            variant="light"
            className="ml-1"
            onClick={() => {
              setSelectedAssignmentDetails(assignmentItem);
              handleShowModalCancel();
            }}
          >
            <ImCross className="edit-icon" style={{ color: 'red' }} />
          </Button>
        </>
      );
    }
    if (assignmentState === enumAssignmentState.COMPLETED) {
      return (
        <>
          <Button variant="light" className="ml-1" disabled>
            <ImCheckmark />
          </Button>
          <Button variant="light" className="ml-1" disabled>
            <ImCross />
          </Button>
        </>
      );
    }
    return (
      <>
        <Button variant="light" className="ml-1">
          <ImCheckmark />
        </Button>
        <Button variant="light" className="ml-1" disabled>
          <ImCross />
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
    requestForReturningTableHeaders.map((tableHeader, index) => {
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
            requestForReturning: true,
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
    if (stateItem === enumAssignmentState.ALL) {
      return setCondition({
        state: `${enumAssignmentState.COMPLETED},${enumAssignmentState.WAITING_FOR_RETURNING}`,
      });
    }
    return setCondition({
      state: stateItem,
    });
  };

  const renderAssigmentList = () => {
    if (loading) {
      return <h2>Loading...</h2>;
    }
    if (!loading) {
      if (assets.length === 0) {
        return <h2>No data</h2>;
      }
      const assetList = assets;

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
                <td style={{ maxWidth: '90px' }}>
                  <span className="popup-button truncate pointer">
                    {assignment.Asset.assetName}
                  </span>
                </td>
              }
            >
              <AssignmentDetail isShowed currentAssignment={assignment} />
            </Popup>
            <td>{assignment.Requested_By ? assignment.Requested_By.username : 'N/A'}</td>
            <td>{moment(assignment.assignedDate).format('DD/MM/YYYY')}</td>
            <td>{assignment.Accepted_By ? assignment.Accepted_By.username : 'N/A'}</td>
            <td>
              {assignment.returnedDate
                ? moment(assignment.returnedDate).format('DD/MM/YYYY')
                : 'N/A'}
            </td>
            <td>{enumAssignmentStateLowerCase[assignment.assignmentState]}</td>
            <td className="edit-delete">{renderActionButtons(assignment)}</td>
          </tr>
        </>
      ));
    }
    return [];
  };

  const renderAssignmentTable = () => {
    if (loading) {
      return <h2>Loading...</h2>;
    }

    if (assets.length === 0) {
      return <h2>No data</h2>;
    }

    return (
      <Table responsive className="assignment-table request-for-returning-table">
        <thead>
          <tr>{renderTableHeaders()}</tr>
        </thead>
        <tbody>{renderAssigmentList()}</tbody>
      </Table>
    );
  };

  return (
    <div>
      <h2 className="form-header">Request List</h2>
      <Row>
        <Col>
          <RequestForReturningStateDropdown
            selectedState={typeState}
            onChangeState={onChangeState}
          />
        </Col>
        <Col>
          <DatePicker
            className="form-control"
            id="assignment-date"
            onChange={handleChangeDate}
            selected={valueDate}
            dateFormat="dd/MM/yyyy"
            placeholderText="Returned Date"
          />
        </Col>
        <Col>{renderSearchBar()}</Col>
      </Row>
      <Row>
        <Col md="12" className="table-user-list">
          {renderAssignmentTable()}
        </Col>
      </Row>
      <Paginator pageObject={assetPageObject} onChangePageNumber={handlePageChange} toTop />
      {/* Modal Completed */}
      <Modal show={showModalComplete} onHide={handleCloseModalComplete}>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to mark this returning request as &apos;Completed&apos;?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleComplete(selectedAssignmentDetails)}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleCloseModalComplete}>
            No
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Cancel Request for Returning */}
      <Modal show={showModalCancel} onHide={handleShowModalCancel}>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to cancel this returning request?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => handleCancelRequestForReturning(selectedAssignmentDetails)}
          >
            Yes
          </Button>
          <Button variant="secondary" onClick={handleCloseModalCancel}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewListRequestForReturning;

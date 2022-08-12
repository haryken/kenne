import React, { useRef, useEffect, useState } from 'react';
import { Modal, Button, Row, Col, FormControl, InputGroup, Table } from 'react-bootstrap';
import { BsSearch, BsFillCaretDownFill, BsFillCaretUpFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import jwPaginate from 'jw-paginate';
import ReactTooltip from 'react-tooltip';
import { getAllUsers } from '../../actions';
import { Paginator } from '../Paginator';
import { assignmentUserTableHeaders } from '../../utils';

const SelectUserModal = ({ isShowed, handleClose, onChangeAssignee, assigneeID }) => {
  const searchInputRef = useRef(null);
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [theSelectedAssigneeID, setTheSelectedAssigneeID] = useState(assigneeID);
  const [sortCriteria, setSortCriteria] = useState({
    sortBy: 'firstName',
    variation: 'ASC',
  });

  const { loading, error, users, currentPage, totalItems, totalPages } = useSelector(
    (state) => state.getAllUsersReducer
  );

  useEffect(() => {
    dispatch(
      getAllUsers({
        ...sortCriteria,
        page,
        searchText: searchInputRef.current ? searchInputRef.current.value : undefined,
      })
    );
  }, [dispatch, sortCriteria, page]);

  const onSearchUser = () => {
    setPage(0);

    dispatch(
      getAllUsers({
        ...sortCriteria,
        page,
        searchText: searchInputRef.current.value,
      })
    );
  };

  const handlePageChange = (pageNumber) => setPage(pageNumber - 1);

  const onChangeSortCriteria = (sortBy) => {
    if (sortCriteria.sortBy === sortBy) {
      return setSortCriteria({
        ...sortCriteria,
        sortBy,
        variation: sortCriteria.variation === 'ASC' ? 'DESC' : 'ASC',
      });
    }

    return setSortCriteria({
      ...sortCriteria,
      sortBy,
      variation: 'ASC',
    });
  };

  const renderTableHeaders = () =>
    assignmentUserTableHeaders.map((tableHeader) => {
      // If current sort by column === table header
      // then it will check whether it sorts order by ASC or DESC

      // The class active is for highlighting
      if (sortCriteria.sortBy === tableHeader.sortBy) {
        return (
          <th
            className="sort-table-header active"
            onClick={() => onChangeSortCriteria(tableHeader.sortBy)}
          >
            {tableHeader.name}

            {/* If this is ASC we display a caret up, else we display a caret down */}
            {sortCriteria.variation === 'ASC' ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />}
          </th>
        );
      }

      // Render a normal non-highlighting table header
      return (
        <th className="sort-table-header" onClick={() => onChangeSortCriteria(tableHeader.sortBy)}>
          {tableHeader.name}
          <BsFillCaretUpFill />
        </th>
      );
    });

  const renderUserTable = () => {
    if (loading) {
      return <h3>Loading...</h3>;
    }
    if (error) {
      return <h3>{error}</h3>;
    }

    return (
      <Table responsive>
        <thead>
          <tr>
            <th>Select</th>
            {renderTableHeaders()}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr className="data-row" key={user.id}>
              <td
                style={{
                  width: '20px',
                  textAlign: 'center',
                }}
              >
                <input
                  type="radio"
                  id={`assigneeID-${user.id}`}
                  name="assigneeID"
                  onClick={() => {
                    setTheSelectedAssigneeID(user.id);
                  }}
                  checked={user.id === theSelectedAssigneeID}
                />
              </td>
              <td>{user.staffCode}</td>
              <td>
                <p
                  data-tip
                  data-for={`assignmentFullNameTooltip-${user.id}`}
                  className="truncate pointer"
                  style={{
                    maxWidth: '220px',
                  }}
                >
                  {user.firstName} {user.lastName}
                </p>
                <ReactTooltip
                  place="bottom"
                  type="dark"
                  id={`assignmentFullNameTooltip-${user.id}`}
                >
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                </ReactTooltip>
              </td>
              <td>{user.userType}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  const changeTheSelectedAssigneeID = () => {
    onChangeAssignee(theSelectedAssigneeID);
    handleClose();
  };

  const returnToInitialID = () => {
    setTheSelectedAssigneeID(assigneeID);
    handleClose();
  };

  return (
    <Modal
      dialogClassName="table-view-modal"
      show={isShowed}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header as={Row}>
        <Col sm="6">
          <Modal.Title className="form-header">Select User</Modal.Title>
        </Col>
        <Col sm="6">
          <InputGroup className="mb-3">
            <FormControl
              ref={searchInputRef}
              type="text"
              id="assigneeName"
              name="assigneeName"
              className="form-control"
            />
            <Button variant="primary" onClick={onSearchUser}>
              <BsSearch />
            </Button>
          </InputGroup>
        </Col>
      </Modal.Header>
      <Modal.Body>
        {renderUserTable()}
        <Paginator
          pageObject={jwPaginate(totalItems, currentPage + 1, 10, totalPages)}
          onChangePageNumber={handlePageChange}
          toTop
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={changeTheSelectedAssigneeID}
          disabled={theSelectedAssigneeID === assigneeID}
        >
          Select
        </Button>
        <Button variant="secondary" onClick={returnToInitialID}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SelectUserModal;

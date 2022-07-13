import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
  Col,
  Row,
  Dropdown,
  InputGroup,
  FormControl,
  Table,
  FormCheck,
} from 'react-bootstrap';
import { BsSearch, BsFunnelFill, BsFillCaretUpFill, BsFillCaretDownFill } from 'react-icons/bs';
import { ImCancelCircle, ImPencil } from 'react-icons/im';
import './userList.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import jwPaginate from 'jw-paginate';
import moment from 'moment';
import Detailed from './DetailUser';
import { disableUser, getAllUsers, removeStoreUser, setHeaderTitle } from '../../actions';
import { userTypes, userTableHeader, createToast, enumUserTypes, isObjectEmpty } from '../../utils';
import { Paginator } from '../../components/Paginator';
import { DisableUserModal } from './components';

const ListUsers = () => {
  const [show, setShow] = useState(false);
  const [userType, setUserType] = useState(enumUserTypes.ALL);
  const dispatch = useDispatch();
  const { loading, error, users, currentPage, totalItems, totalPages } = useSelector(
    (state) => state.getAllUsersReducer
  );

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [disableModalShow, setDisableModalShow] = useState(false);
  const [disableUserID, setDisableUserID] = useState(null);
  const { user: newUser } = useSelector((state) => state.storeUserReducer);
  const { userData } = useSelector((state) => state.authReducer);
  const { loading: disableUserLoading, error: disableUserError } = useSelector(
    (state) => state.disableUserReducer
  );
  const [searchText, setSearchText] = useState('');
  const [condition, setCondition] = useState({});
  const [sortCriteria, setSortCriteria] = useState({
    sortBy: 'firstName',
    variation: 'ASC',
  });

  const handleCloseDisableUserModal = () => {
    setDisableModalShow(false);
  };

  useEffect(() => {
    if (isSubmitted) {
      if (!disableUserLoading) {
        if (disableUserError) {
          createToast(disableUserError, 'error');
        } else {
          dispatch(getAllUsers({ ...condition, ...sortCriteria }));
          dispatch(removeStoreUser());
          handleCloseDisableUserModal();
        }
        setIsSubmitted(false);
      }
    }
  }, [isSubmitted, disableUserLoading, disableUserError]);

  useEffect(() => {
    dispatch(setHeaderTitle(['Manage User']));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllUsers({ ...condition, ...sortCriteria }));
    if (
      searchText ||
      sortCriteria.sortBy !== 'firstName' ||
      sortCriteria.variation !== 'ASC' ||
      !isObjectEmpty(condition)
    ) {
      dispatch(removeStoreUser());
    }
  }, [condition, dispatch, sortCriteria]);

  useEffect(() => {
    if (!loading && error) {
      createToast(error, 'error');
    }
  }, [loading, error]);

  const onChangeSortCriteria = (sortBy) => {
    setSearchText('');
    if (sortCriteria.sortBy === sortBy) {
      return setSortCriteria({
        sortBy,
        variation: sortCriteria.variation === 'ASC' ? 'DESC' : 'ASC',
      });
    }
    return setSortCriteria({
      sortBy,
      variation: 'ASC',
    });
  };

  const handlePageChange = (pageNumber) => setCondition({ ...condition, page: pageNumber - 1 });

  const onClickDisable = (userID) => {
    setDisableModalShow(true);
    setDisableUserID(userID);
  };

  const renderTableHeaders = () =>
    userTableHeader.map((tableHeader) => {
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

  const renderUserList = () => {
    let userList = users.filter((item) => item.id !== userData.user.id);
    if (newUser) {
      userList = [newUser, ...users.filter((item) => item.id !== newUser.id)];
    }
    return (
      <tbody>
        {userList.map((user) => (
          <tr className="row-data" key={user.id}>
            <Popup modal trigger={<td className="popup-button">{user.staffCode}</td>}>
              <Detailed isShowed currentUser={user} />
            </Popup>
            <Popup
              modal
              trigger={
                <td className="popup-button">
                  <p
                    className="truncate"
                    style={{
                      maxWidth: '150px',
                    }}
                  >
                    {user.firstName} {user.lastName}
                  </p>
                </td>
              }
            >
              <Detailed isShowed currentUser={user} />
            </Popup>
            <td>
              <p
                className="truncate"
                style={{
                  maxWidth: '150px',
                }}
              >
                {user.username}
              </p>
            </td>
            <td>{moment(user.joinedDate).format('DD/MM/YYYY')}</td>
            <td>{user.userType}</td>
            <td className="edit-delete">
              <Link to={`/users/edit/${user.id}`} className="btn btn-light ">
                <ImPencil className="edit-icon" />
              </Link>
              <Button variant="light" className="ml-2" onClick={() => onClickDisable(user.id)}>
                <ImCancelCircle className="delete-icon" />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  };

  const renderUserTable = () => {
    if (loading) {
      return <h2>Loading...</h2>;
    }
    if (error) {
      return <h2>{error}</h2>;
    }
    if (!loading && users.length === 0) {
      return <h2>No data</h2>;
    }

    return (
      <Table responsive>
        <thead>
          <tr>{renderTableHeaders()}</tr>
        </thead>
        {renderUserList()}
      </Table>
    );
  };

  const searchInput = useRef(null);

  const handleChangeSearch = () => {
    setSearchText(searchInput.current.value);
  };

  const onClickDisableUser = (userID) => {
    dispatch(disableUser(userID));
    setIsSubmitted(true);
  };

  const renderSearchBar = () => (
    <InputGroup>
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
            searchText,
          });
        }}
      >
        <BsSearch />
      </Button>
    </InputGroup>
  );

  const renderCheckBoxItems = () =>
    userTypes.map((checkBoxItem) => (
      <div
        className="dropdown-item"
        onKeyDown={checkBoxItem}
        role="button"
        tabIndex="0"
        onClick={() => {
          setSearchText('');
          setUserType(checkBoxItem);
          setCondition({
            type: checkBoxItem,
          });
        }}
      >
        <FormCheck label={checkBoxItem} checked={userType === checkBoxItem} value={checkBoxItem} />
      </div>
    ));
  return (
    <div id="user-list-table">
      <h2 className="form-header">User List</h2>
      <Row>
        <Col md="3">
          <div className="input-with-dropdown">
            <Dropdown show={show}>
              <InputGroup className="mb-3">
                <FormControl placeholder="Type" value={userType} disabled />
                <Dropdown.Toggle
                  onClick={() => setShow(!show)}
                  id="dropdown-basic"
                  variant="danger"
                  drop="down"
                >
                  <BsFunnelFill />
                </Dropdown.Toggle>

                <Dropdown.Menu>{renderCheckBoxItems()}</Dropdown.Menu>
              </InputGroup>
            </Dropdown>
          </div>
        </Col>
        <Col md="4" className="offset-md-2">
          {renderSearchBar()}
        </Col>
        <Col md="3">
          <Link to="/users/create" className="btn btn-primary btn-block">
            Create new user
          </Link>
        </Col>
      </Row>
      <Row>
        <Col md="12" className="table-user-list">
          {renderUserTable()}
        </Col>
      </Row>

      <Paginator
        pageObject={jwPaginate(totalItems, currentPage + 1, 10, totalPages)}
        onChangePageNumber={handlePageChange}
        toTop
      />

      <DisableUserModal
        isShowed={disableModalShow}
        handleClose={handleCloseDisableUserModal}
        userID={disableUserID}
        onClickDisableUser={onClickDisableUser}
      />
    </div>
  );
};

export default ListUsers;

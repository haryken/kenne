import React, { useRef, useEffect, useState } from 'react';
import { Modal, Button, Row, Col, FormControl, InputGroup, Table } from 'react-bootstrap';
import { BsSearch, BsFillCaretDownFill, BsFillCaretUpFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { findAssets } from '../../actions';
import { Paginator } from '../Paginator';
import { assignmentAssetTableHeaders, generateFindAssetsURL } from '../../utils';

const SelectAssetModal = ({ isShowed, handleClose, onChangeAssignee, assetID, initialAsset }) => {
  const searchInputRef = useRef(null);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [theSelectedAssetID, setTheSelectedAssetID] = useState(assetID);
  const [sortCriteria, setSortCriteria] = useState({
    sortBy: 'assetName',
    order: 'ASC',
  });

  const { loading, error, assets, assetPageObject } = useSelector(
    (state) => state.findAssetsReducer
  );

  useEffect(() => {
    let searchObject = {
      currentPage,
      sortCriteria,
      searchText: searchInputRef.current ? searchInputRef.current.value : undefined,
      selectedStateList: ['Available'],
      specificAssetID: initialAsset ? initialAsset.id : undefined,
    };
    if (
      searchInputRef.current &&
      searchInputRef.current.value &&
      !(
        initialAsset.assetCode.includes(searchInputRef.current.value) ||
        initialAsset.assetName.includes(searchInputRef.current.value)
      )
    ) {
      searchObject = {
        currentPage,
        sortCriteria,
        searchText: searchInputRef.current ? searchInputRef.current.value : undefined,
        selectedStateList: ['Available'],
      };
    }
    const findAssetURL = generateFindAssetsURL(searchObject);
    dispatch(findAssets(findAssetURL));
  }, [dispatch, sortCriteria, currentPage, initialAsset]);

  const onSearchAsset = () => {
    setCurrentPage(1);

    let searchObject = {
      sortCriteria,
      searchText: searchInputRef.current.value,
      currentPage: 1,
      selectedStateList: ['Available'],
    };

    if (initialAsset) {
      if (
        !searchInputRef.current.value ||
        initialAsset.assetCode.includes(searchInputRef.current.value) ||
        initialAsset.assetName.includes(searchInputRef.current.value)
      ) {
        searchObject = {
          sortCriteria,
          searchText: searchInputRef.current.value,
          currentPage: 1,
          selectedStateList: ['Available'],
          specificAssetID: initialAsset ? initialAsset.id : undefined,
        };
      }
    }

    const findAssetURL = generateFindAssetsURL(searchObject);

    dispatch(findAssets(findAssetURL));
  };

  const onChangeSortCriteria = (sortBy) => {
    setCurrentPage(1);

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
    assignmentAssetTableHeaders.map((tableHeader) => {
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
            {sortCriteria.order === 'ASC' ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />}
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

  const renderAssetTable = () => {
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
          {assets.map((asset) => (
            <tr className="data-row" key={asset.id}>
              <td
                style={{
                  width: '20px',
                  textAlign: 'center',
                }}
              >
                <input
                  type="radio"
                  id={`assetID-${asset.id}`}
                  name="assetID"
                  onClick={() => {
                    setTheSelectedAssetID(asset.id);
                  }}
                  checked={asset.id === theSelectedAssetID}
                />
              </td>
              <td>{asset.assetCode}</td>
              <td>
                <p
                  data-tip
                  data-for={`assignmentAssetNameTooltip-${asset.id}`}
                  className="truncate pointer"
                  style={{
                    maxWidth: '220px',
                  }}
                >
                  {asset.assetName}
                </p>
                <ReactTooltip
                  place="bottom"
                  type="dark"
                  id={`assignmentAssetNameTooltip-${asset.id}`}
                >
                  <span>{asset.assetName}</span>
                </ReactTooltip>
              </td>
              <td>{asset.Category.categoryName}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  const onChangePageNumber = (page) => {
    setCurrentPage(page);
  };

  const changeTheSelectedAssetID = () => {
    onChangeAssignee(theSelectedAssetID);
    handleClose();
  };

  const returnToInitialID = () => {
    setTheSelectedAssetID(assetID);
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
          <Modal.Title className="form-header">Select Asset</Modal.Title>
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
            <Button variant="primary" onClick={onSearchAsset}>
              <BsSearch />
            </Button>
          </InputGroup>
        </Col>
      </Modal.Header>
      <Modal.Body>
        {renderAssetTable()}
        <Paginator pageObject={assetPageObject} onChangePageNumber={onChangePageNumber} toTop />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={changeTheSelectedAssetID}
          disabled={theSelectedAssetID === assetID}
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

export default SelectAssetModal;

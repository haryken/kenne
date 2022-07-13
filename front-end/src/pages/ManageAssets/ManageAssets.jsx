import React, { useState, useEffect, useRef } from 'react';
import { Button, Row, Col, InputGroup, FormControl, Table } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { ImCancelCircle, ImPencil } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  deleteAsset,
  findAssets,
  removeStoreAsset,
  clearDeleteAssetError,
  setHeaderTitle,
} from '../../actions';
import { generateFindAssetsURL, enumAssetState } from '../../utils';
import {
  AssetDetailsModal,
  StateDropdown,
  CategoryDropdown,
  AssetTableView,
  DeleteAssetModal,
} from './components';
import { Paginator } from '../../components/Paginator';
import './manageAssets.scss';

const ManageAssets = () => {
  const dispatch = useDispatch();

  const {
    loading: assetLoading,
    error: assetError,
    assets,
    assetPageObject,
  } = useSelector((state) => state.findAssetsReducer);

  const { asset } = useSelector((state) => state.storeAssetReducer);

  const { loading: deleteAssetLoading, error: deleteAssetError } = useSelector(
    (state) => state.deleteAssetReducer
  );

  const [deleteAssetID, setDeleteAssetID] = useState(null);
  const [disableModalShow, setDisableModalShow] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAssetDetails, setSelectedAssetDetails] = useState(null);
  const [selectedStateList, setSelectedStateList] = useState([
    'Available',
    'Assigned',
    'Not Available',
  ]);
  const [selectedCategoryList, setSelectedCategoryList] = useState([0]);
  const [searchText, setSearchText] = useState('');
  const [sortCriteria, setSortCriteria] = useState({
    sortBy: 'assetName',
    order: 'ASC',
  });

  const searchInput = useRef(null);

  const handleCloseDeleteAssetModal = () => {
    setDisableModalShow(false);
    dispatch(clearDeleteAssetError());
  };

  useEffect(() => {
    if (isSubmitted) {
      if (!deleteAssetLoading) {
        if (!deleteAssetError) {
          const findAssetURL = generateFindAssetsURL({
            selectedCategoryList,
            selectedStateList,
            searchText,
            sortCriteria,
            currentPage,
          });
          dispatch(findAssets(findAssetURL));
          dispatch(removeStoreAsset());
          handleCloseDeleteAssetModal();
        }
        setIsSubmitted(false);
      }
    }
  }, [isSubmitted, deleteAssetLoading, deleteAssetError]);

  useEffect(() => {
    dispatch(setHeaderTitle(['Manage Asset']));
  }, [dispatch]);

  useEffect(() => {
    if (
      selectedStateList.length !== 3 ||
      sortCriteria.sortBy !== 'assetName' ||
      sortCriteria.order !== 'ASC' ||
      currentPage !== 1
    ) {
      dispatch(removeStoreAsset());
    }
    const findAssetURL = generateFindAssetsURL({
      selectedCategoryList,
      selectedStateList,
      searchText,
      sortCriteria,
      currentPage,
    });
    dispatch(findAssets(findAssetURL));
  }, [selectedCategoryList, selectedStateList, searchText, sortCriteria, currentPage]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onClickDisable = (assetID) => {
    setDisableModalShow(true);
    setDeleteAssetID(assetID);
  };

  const onChangePageNumber = (page) => {
    setCurrentPage(page);
  };

  const onChangeStateList = (stateName) => {
    setCurrentPage(1);

    if (stateName === 'All') {
      return setSelectedStateList(['All']);
    }

    if (selectedStateList.includes(stateName)) {
      const filteredList = selectedStateList.filter(
        (selectedStateItem) => selectedStateItem !== stateName
      );
      if (filteredList.length === 0) {
        return setSelectedStateList(['All']);
      }
      return setSelectedStateList(filteredList);
    }

    return setSelectedStateList([
      ...selectedStateList.filter((selectedStateItem) => selectedStateItem !== 'All'),
      stateName,
    ]);
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

  const onChangeCategoryList = (categoryID) => {
    setCurrentPage(1);

    if (categoryID === 0) {
      return setSelectedCategoryList([0]);
    }

    if (selectedCategoryList.includes(categoryID)) {
      const filteredList = selectedCategoryList.filter(
        (selectedCategoryItem) => selectedCategoryItem !== categoryID
      );
      if (filteredList.length === 0) {
        return setSelectedCategoryList([0]);
      }
      return setSelectedCategoryList(filteredList);
    }

    return setSelectedCategoryList([
      ...selectedCategoryList.filter((selectedCategoryItem) => selectedCategoryItem !== 0),
      categoryID,
    ]);
  };

  const onClickDeleteAsset = (assetID) => {
    dispatch(deleteAsset(assetID));
    setIsSubmitted(true);
  };

  const renderSearchBar = () => (
    <InputGroup className="mb-3">
      <FormControl placeholder="Search" ref={searchInput} />

      <Button
        variant="secondary"
        onClick={() => {
          setSearchText(searchInput.current.value);
        }}
      >
        <BsSearch />
      </Button>
    </InputGroup>
  );

  const renderAssetTableView = () => {
    if (assetLoading) {
      return <h2>Loading...</h2>;
    }

    if (!assetLoading) {
      if (assetError) {
        return <h2>{assetError}</h2>;
      }

      let assetList = assets;

      if (asset) {
        assetList = [asset, ...assets.filter((assetItem) => assetItem.id !== asset.id)];
      }

      return assetList.map((assetItem) => (
        <tr className="row-data">
          <td
            className="pointer"
            onClick={() => {
              handleShow();
              setSelectedAssetDetails(assetItem);
            }}
            role="presentation"
          >
            {assetItem.assetCode}
          </td>
          <td
            className="pointer"
            onClick={() => {
              handleShow();
              setSelectedAssetDetails(assetItem);
            }}
            role="presentation"
          >
            <p
              className="truncate"
              style={{
                maxWidth: '150px',
              }}
            >
              {assetItem.assetName}
            </p>
          </td>
          <td onClick={handleShow} role="presentation">
            {assetItem.Category.categoryName}
          </td>
          <td onClick={handleShow} role="presentation">
            {assetItem.state}
          </td>
          <td className="text-center">
            {enumAssetState.ASSIGNED === assetItem.state ? (
              <Button variant="light" disabled>
                <ImPencil style={{ opacity: 0.7 }} />
              </Button>
            ) : (
              <Link to={`/assets/edit/${assetItem.id}`} className="btn btn-light">
                <ImPencil style={{ color: 'black' }} className="pointer" />
              </Link>
            )}
            <Button
              variant="light"
              disabled={enumAssetState.ASSIGNED === assetItem.state}
              className="ml-2"
              onClick={() => onClickDisable(assetItem.id)}
            >
              <ImCancelCircle
                className="pointer"
                style={{ color: enumAssetState.ASSIGNED === assetItem.state ? '' : 'red' }}
              />
            </Button>
          </td>
        </tr>
      ));
    }

    return [];
  };

  return (
    <div id="manage-asset-page">
      <h2 className="form-header">Manage Asset</h2>
      <Row>
        <Col sm="3">
          <StateDropdown
            selectedStateList={selectedStateList}
            onChangeStateList={onChangeStateList}
          />
        </Col>
        <Col sm="3">
          <CategoryDropdown
            onChangeCategoryList={onChangeCategoryList}
            selectedCategoryList={selectedCategoryList}
          />
        </Col>
        <Col sm="3">{renderSearchBar()}</Col>
        <Col sm="3">
          <Link to="/assets/create" className="btn btn-primary btn-block">
            Create New Asset
          </Link>
        </Col>
      </Row>
      {assets.length === 0 ? (
        <h2>No data</h2>
      ) : (
        <Table responsive className="table-asset-list">
          <AssetTableView sortCriteria={sortCriteria} onChangeSortCriteria={onChangeSortCriteria} />
          <tbody>{renderAssetTableView()}</tbody>
        </Table>
      )}

      <Paginator pageObject={assetPageObject} onChangePageNumber={onChangePageNumber} toTop />

      <AssetDetailsModal
        selectedAssetDetails={selectedAssetDetails}
        handleClose={handleClose}
        isShowed={show}
      />

      <DeleteAssetModal
        isShowed={disableModalShow}
        handleClose={handleCloseDeleteAssetModal}
        assetID={deleteAssetID}
        onClickDeleteAsset={onClickDeleteAsset}
      />
    </div>
  );
};

export default ManageAssets;

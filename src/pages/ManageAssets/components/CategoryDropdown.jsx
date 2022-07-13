import React, { useState, useEffect } from 'react';
import { InputGroup, FormControl, Dropdown, FormCheck } from 'react-bootstrap';
import { BsFunnelFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../../actions';

const CategoryDropdown = ({ selectedCategoryList, onChangeCategoryList }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const {
    loading: categoryLoading,
    error: categoryError,
    categories,
  } = useSelector((state) => state.getAllCategoriesReducer);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const renderCategoryItems = () => {
    if (categoryLoading) {
      return <div className="dropdown-item">Loading</div>;
    }

    if (categoryError) {
      return <div className="dropdown-item">Loading</div>;
    }

    return [
      {
        id: 0,
        categoryName: 'All',
      },
      ...categories,
    ].map((categoryItem) => (
      <div
        key={categoryItem.id}
        className="dropdown-item"
        onClick={() => {
          onChangeCategoryList(categoryItem.id);
        }}
        role="presentation"
      >
        <FormCheck
          label={categoryItem.categoryName}
          checked={selectedCategoryList.includes(categoryItem.id)}
          onChange={() => {}}
        />
      </div>
    ));
  };

  const generateCategoryTitle = () => {
    let ans = '';

    for (let i = 0; i < selectedCategoryList.length; i += 1) {
      const selectedCategoryItem = [
        {
          id: 0,
          categoryName: 'All',
        },
        ...categories,
      ].find((categoryItem) => categoryItem.id === selectedCategoryList[i]).categoryName;

      if (i === selectedCategoryList.length - 1) {
        ans += selectedCategoryItem;
        // eslint-disable-next-line no-continue
        continue;
      }

      ans += `${selectedCategoryItem}, `;
    }

    return ans;
  };

  return (
    <div className="input-with-dropdown">
      <InputGroup className="mb-3">
        <FormControl placeholder="Type" value={generateCategoryTitle()} />

        <Dropdown show={show}>
          <Dropdown.Toggle onClick={() => setShow(!show)} id="dropdown-basic" variant="primary">
            <BsFunnelFill />
          </Dropdown.Toggle>

          <Dropdown.Menu>{renderCategoryItems()}</Dropdown.Menu>
        </Dropdown>
      </InputGroup>
    </div>
  );
};

export default CategoryDropdown;

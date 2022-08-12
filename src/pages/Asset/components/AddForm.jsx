import React, { useEffect, useState } from 'react';
import { Form, Col, Row, Button, FormLabel, Dropdown } from 'react-bootstrap';
import { Formik, ErrorMessage, Field } from 'formik';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { createAsset } from '../../../actions';
import AddCategoryForm from './AddCategoryForm';
import { createToast } from '../../../utils';
import './AddForm.css';
import { AddAndUpdateSchema } from '../../../schemas';
import { DateInput } from '../../../components/DateInput';

const AddForm = () => {
  const initValue = {
    name: '',
    category: 1,
    specification: '',
    installedDate: '',
    state: '',
    categoryName: '',
    slug: '',
  };

  const CATEGORY_URL = `${process.env.REACT_APP_API_URL}/categories`;
  const { addSuccess, errorAddCategory } = useSelector((state) => state.createCategoryReducer);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAddCatForm, setShowAddCatForm] = useState(false);
  const [listCategory, setListCat] = useState([]);
  const [indexCategory, setIndexCategory] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, error } = useSelector((state) => state.createAssetReducer);

  useEffect(() => {
    if (isSubmitted && !loading) {
      if (error) createToast(error, 'error');
      else {
        setIsSubmitted(false);
        history.push('/assets');
      }
    }
  }, [isSubmitted, loading, error]);

  useEffect(() => {
    if (errorAddCategory) {
      createToast(errorAddCategory, 'error');
    }
  }, [errorAddCategory]);

  useEffect(async () => {
    await axios.get(CATEGORY_URL).then((response) => {
      if (response.status === 200) setListCat(response.data);
    });
  }, [addSuccess]);

  const onSubmit = (values) => {
    dispatch(createAsset({ ...values }));
    setIsSubmitted(true);
  };

  const showAddCategory = () => {
    setShowAddCatForm(true);
  };

  const handleClick = (e) => {
    setIndexCategory(e.currentTarget.textContent);
  };

  const renderListCategory = (list) =>
    list.map((item) => (
      <Dropdown.Item onClick={handleClick} eventKey={item.id}>
        {item.categoryName}
      </Dropdown.Item>
    ));

  return (
    <div id="asset-form-container">
      <ToastContainer />
      <Formik initialValues={initValue} validationSchema={AddAndUpdateSchema} onSubmit={onSubmit}>
        {({
          isSubmitting,
          handleSubmit,
          dirty,
          isValid,
          setFieldValue,
          values,
          setFieldTouched,
        }) => (
          <Form onSubmit={handleSubmit} className="formContainer" autoComplete="off">
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
              <Form.Label column sm="2">
                Name<sup className="required-icon">*</sup>
              </Form.Label>
              <Col sm="10">
                <Field id="name" name="name" placeholder="" className="form-control" />
                <ErrorMessage name="name" component="span" className="error-message" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Category<sup className="required-icon">*</sup>
              </Form.Label>
              <Col sm="10">
                <Dropdown
                  className="dropdown"
                  onSelect={(e) => {
                    setFieldValue('category', e);
                  }}
                >
                  <Dropdown.Toggle
                    variant="secondary"
                    className="d-flex align-items-start justify-content-between"
                    id="dropdown-togle"
                  >
                    {indexCategory || 'Laptop'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu">
                    {renderListCategory(listCategory)}
                    <Dropdown.Divider />
                    {!showAddCatForm ? (
                      <Button type="button" className="btn btn-light" onClick={showAddCategory}>
                        <u className="text-danger">Add new category</u>
                      </Button>
                    ) : (
                      // TODO DONT USE FORM NESTED IN FORM
                      <AddCategoryForm setShowAddCatForm={setShowAddCatForm} />
                    )}
                  </Dropdown.Menu>
                </Dropdown>
                <ErrorMessage name="category" component="span" className="error-message" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Specification<sup className="required-icon">*</sup>
              </Form.Label>
              <Col sm="10">
                <Field as="textarea" name="specification" placeholder="" className="text-area" />
                <ErrorMessage name="specification" component="span" className="error-message" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Installed Date<sup className="required-icon">*</sup>
              </Form.Label>
              <Col sm="10">
                <DateInput
                  type="date"
                  id="installedDate"
                  name="installedDate"
                  className="form-control"
                  formikValues={values}
                  formikSetFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                />
                <ErrorMessage name="installedDate" component="span" className="error-message" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                State<sup className="required-icon">*</sup>
              </Form.Label>
              <Col sm="10">
                <Row>
                  <Col>
                    <Field type="radio" id="available-state" name="state" value="Available" />
                    <FormLabel className="radio-button" htmlFor="available-state">
                      Available
                    </FormLabel>
                  </Col>
                </Row>
                <Field type="radio" id="not-available-state" name="state" value="Not Available" />
                <FormLabel className="radio-button" htmlFor="not-available-state">
                  Not Available
                </FormLabel>
                <ErrorMessage name="state" component="span" className="error-message" />
              </Col>
            </Form.Group>
            <Form.Group className="text-right">
              <Button
                disabled={!(dirty && isValid) || isSubmitting || loading || isSubmitted}
                type="submit"
                className="btn btn-primary"
              >
                Submit
              </Button>
              <Button
                id="cancel-button"
                className="btn btn-light"
                onClick={() => {
                  history.push('/assets');
                }}
                disabled={isSubmitting || loading || isSubmitted}
              >
                Cancel
              </Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddForm;

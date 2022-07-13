import React from 'react';
import { Formik, ErrorMessage, Field } from 'formik';
import { Form, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { createCategory } from '../../../actions/categoryAction';
import './AddCategoryForm.css';

export default function AddCategoryForm(props) {
  const categoryInitValue = {
    categoryName: '',
    slug: '',
  };

  const dispatch = useDispatch();
  const categorySchema = Yup.object().shape({
    categoryName: Yup.string()
      .required('Name is a required field')
      .max(255)
      .test('categoryName', 'Invalid name', (value) => {
        if (value) {
          const str = value.replace(/\s\s+/g, ' ');
          return str === value;
        }
        return true;
      })
      .test('categoryName', 'Invalid name', (value) => {
        if (value) {
          return !value.slice(-1).includes(' ');
        }
        return true;
      }),
    slug: Yup.string()
      .required('Prefix is a required field')
      .max(255)
      .min(1)
      .test('slug', 'Prefix do not include spaces!', (value) => {
        if (value) {
          return !value.includes(' ');
        }
        return true;
      }),
  });

  const handleClick = (prop) => {
    prop.setShowAddCatForm(false);
  };

  const onclickHandle = (values) => {
    dispatch(createCategory({ ...values }));
  };

  return (
    <Formik validationSchema={categorySchema} initialValues={categoryInitValue}>
      {({ dirty, isValid, values, resetForm }) => (
        <Form className="formCategory" autoComplete="off">
          <Row>
            <Form.Group className="mb-3 col-6">
              <Field
                id="categoryName"
                name="categoryName"
                placeholder="Name"
                className="form-control"
              />
              <ErrorMessage name="categoryName" component="span" className="error-message" />
            </Form.Group>
            <Form.Group className="mb-3 col-3">
              <Field id="slug" name="slug" placeholder="Prefix" className="form-control" />
              <ErrorMessage name="slug" component="span" className="error-message" />
            </Form.Group>
            <div className="col-1">
              <button
                disabled={!(dirty && isValid)}
                className="btn btn-info"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  resetForm();
                  onclickHandle(values);
                }}
              >
                <FontAwesomeIcon color="red" icon={faCheck} />
              </button>
            </div>
            <div className="col-1">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(props);
                }}
                className="btn btn-danger"
                type="button"
              >
                <FontAwesomeIcon color="black" icon={faTimes} />
              </button>
            </div>
          </Row>
        </Form>
      )}
    </Formik>
  );
}

import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, FormLabel, Row, Col } from 'react-bootstrap';
import * as Yup from 'yup';
import { differenceInYears, getISODay } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';
import { getUser, editUser } from '../../../actions';
import { createToast } from '../../../utils';
import { DateInput } from '../../../components/DateInput';

const EditUserForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const { loading, error, data } = useSelector((state) => state.getUserReducer);
  const { editingLoading, editingError } = useSelector((state) => state.editUserReducer);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const validationSchema = Yup.object().shape({
    dateOfBirth: Yup.date()
      .required('Date of birth is a required field')
      .test(
        'dateOfBirth',
        'Date of birth must be before current date!',
        (value) => new Date(value) < new Date()
      )
      .test(
        'dateOfBirth',
        'User is under 18. Please select a different date',
        (value) => differenceInYears(new Date(), new Date(value)) >= 18
      ),
    gender: Yup.string().required('Gender is a required field').max(10),
    joinedDate: Yup.date()
      .required('Joined date is a required field')
      .min(
        Yup.ref('dateOfBirth'),
        'Joined date is not later than Date of Birth. Please select a different date'
      )
      .test(
        'joinedDate',
        'Joined date is Saturday or Sunday. Please select a different date',
        (value) => getISODay(new Date(value)) !== 7 && getISODay(new Date(value)) !== 6
      )
      .test('joinedDate', 'User is under 18. Please select a different date', (value, ctx) => {
        if (!ctx.parent.dateOfBirth) {
          return true;
        }
        return differenceInYears(new Date(value), ctx.parent.dateOfBirth) >= 18;
      }),
    userType: Yup.string('User type is a required field').required().max(20),
  });
  useEffect(() => {
    dispatch(getUser(id));
  }, []);
  useEffect(() => {
    if (!loading && error) {
      history.push('/users');
    }
  }, [loading, error]);
  useEffect(() => {
    if (isSubmitted) {
      if (!editingLoading && editingError) {
        createToast(editingError, 'error');
        setIsSubmitted(false);
      }
      if (!loading && !error) {
        history.push('/users');
      }
    }
  }, [isSubmitted, editingLoading, editingError]);
  const onSubmit = (values) => {
    dispatch(editUser(id, values.dateOfBirth, values.joinedDate, values.gender, values.userType));
    setIsSubmitted(true);
  };
  const cancel = () => {
    history.push('/users');
  };
  if (!loading && data) {
    return (
      <>
        <ToastContainer />
        <Formik
          initialValues={{
            firstName: data.firstName,
            lastName: data.lastName,
            dateOfBirth: new Date(data.dateOfBirth),
            gender: data.gender,
            joinedDate: new Date(data.joinedDate),
            userType: data.userType,
          }}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ isSubmitting, dirty, isValid, values, setFieldValue, setFieldTouched }) => (
            <Form className="formContainer" autoComplete="off">
              <FormGroup as={Row} className="mb-3">
                <FormLabel htmlFor="firstName" column sm="3">
                  First Name
                </FormLabel>
                <Col sm="9">
                  <Field
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    className="form-control"
                    disabled
                  />
                  <ErrorMessage name="firstName" component="span" className="error-message" />
                </Col>
              </FormGroup>

              <FormGroup as={Row} className="mb-3">
                <FormLabel htmlFor="lastName" column sm="3">
                  Last Name
                </FormLabel>
                <Col sm="9">
                  <Field
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    className="form-control"
                    disabled
                  />
                  <ErrorMessage name="lastName" component="span" className="error-message" />
                </Col>
              </FormGroup>

              <FormGroup as={Row} className="mb-3">
                <FormLabel htmlFor="dateOfBirth" column sm="3">
                  Date Of Birth<sup className="required-icon">*</sup>
                </FormLabel>
                <Col sm="9">
                  <DateInput
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    className="form-control"
                    formikValues={values}
                    formikSetFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                  />
                  <ErrorMessage name="dateOfBirth" component="span" className="error-message" />
                </Col>
              </FormGroup>

              <FormGroup as={Row} className="mb-3">
                <FormLabel htmlFor="gender" column sm="3" className="mt-1">
                  Gender<sup className="required-icon">*</sup>
                </FormLabel>
                <Col sm="9">
                  <Row className="mt-2">
                    <div className="form-check">
                      <Field type="radio" id="female-gender" name="gender" value="Female" />
                      <FormLabel htmlFor="female-gender" className="ml-3 mt-1">
                        Female
                      </FormLabel>
                    </div>

                    <div className="form-check">
                      <Field type="radio" id="male-gender" name="gender" value="Male" />
                      <FormLabel htmlFor="male-gender" className="ml-3 mt-1">
                        Male
                      </FormLabel>
                    </div>
                  </Row>

                  <ErrorMessage name="gender" component="span" className="error-message" />
                </Col>
              </FormGroup>

              <FormGroup as={Row} className="mb-3">
                <FormLabel htmlFor="joinedDate" column sm="3">
                  Joined Date<sup className="required-icon">*</sup>
                </FormLabel>
                <Col sm="9">
                  <DateInput
                    type="date"
                    id="joinedDate"
                    name="joinedDate"
                    className="form-control"
                    formikValues={values}
                    formikSetFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                  />
                  <ErrorMessage name="joinedDate" component="span" className="error-message" />
                </Col>
              </FormGroup>

              <FormGroup as={Row} className="mb-3">
                <FormLabel htmlFor="userType" column sm="3">
                  Type<sup className="required-icon">*</sup>
                </FormLabel>
                <Col sm="9">
                  <Field component="select" id="userType" name="userType" className="custom-select">
                    <option value="Staff">Staff</option>
                    <option value="Admin">Admin</option>
                  </Field>
                  <ErrorMessage name="userType" component="span" className="error-message" />
                </Col>
              </FormGroup>

              <FormGroup className="text-right mb-0">
                <button
                  disabled={!(dirty && isValid) || isSubmitting || editingLoading || isSubmitted}
                  type="submit"
                  className="btn btn-primary"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={cancel}
                  className="btn btn-light ml-4"
                  disabled={isSubmitting || editingLoading || isSubmitted}
                >
                  Cancel
                </button>
              </FormGroup>
            </Form>
          )}
        </Formik>
      </>
    );
  }
  return <></>;
};

export default EditUserForm;

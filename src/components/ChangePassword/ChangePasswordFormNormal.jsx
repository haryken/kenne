import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, FormLabel, InputGroup } from 'react-bootstrap';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { changePassword } from '../../actions';

const ChangePasswordFormNormal = ({ handleClose }) => {
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.changePasswordReducer);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (isSubmitted) {
      setIncorrectPassword(false);
      if (!loading) {
        if (error) {
          setIncorrectPassword(true);
        } else {
          setSuccessMessage('Your password has been changed successfully');
        }
        setIsSubmitted(false);
      }
    }
  }, [isSubmitted, loading, error]);

  const initialValues = {
    oldPassword: '',
    newPassword: '',
  };

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .required('Old password is required')
      .min(6, 'Password must have at least 6 characters')
      .max(1024, 'Password length must be below 1024 characters')
      .test('newPassword', 'Old password and new password cannot be the same', (value, ctx) => {
        const { newPassword } = ctx.parent;
        return newPassword !== value;
      }),
    newPassword: Yup.string()
      .required('New password is required')
      .min(6, 'Password must have at least 6 characters')
      .max(1024, 'Password length must be below 1024 characters')
      .test('newPassword', 'New password and old password cannot be the same', (value, ctx) => {
        const { oldPassword } = ctx.parent;
        return oldPassword !== value;
      }),
  });

  const onSubmit = (values) => {
    dispatch(changePassword(values));
    return setIsSubmitted(true);
  };

  if (successMessage) {
    return (
      <>
        <p>{successMessage}</p>
        <div className="text-right">
          <button type="button" className="btn btn-light" onClick={handleClose}>
            Cancel
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ dirty, isValid, handleChange }) => (
          <Form className="formContainer" autoComplete="off">
            <FormGroup>
              <FormLabel htmlFor="oldPassword">Old Password: </FormLabel>
              <InputGroup>
                <Field
                  type={showOldPassword ? 'text' : 'password'}
                  id="oldPassword"
                  name="oldPassword"
                  onChange={(e) => {
                    handleChange(e);
                    setIncorrectPassword(false);
                  }}
                  placeholder="Old Password"
                  className={`form-control ${incorrectPassword ? 'error' : ''}`}
                />
                <InputGroup.Text onClick={() => setShowOldPassword(!showOldPassword)}>
                  {showOldPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </InputGroup.Text>
              </InputGroup>
              {incorrectPassword ? (
                <span className="error-message">{error}</span>
              ) : (
                <ErrorMessage name="oldPassword" component="span" className="error-message" />
              )}
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="newPassword">New Password: </FormLabel>
              <InputGroup>
                <Field
                  type={showNewPassword ? 'text' : 'password'}
                  id="newPassword"
                  name="newPassword"
                  placeholder="New Password"
                  className="form-control"
                />
                <InputGroup.Text onClick={() => setShowNewPassword(!showNewPassword)}>
                  {showNewPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </InputGroup.Text>
              </InputGroup>
              <ErrorMessage name="newPassword" component="span" className="error-message" />
            </FormGroup>

            <FormGroup className="text-right mb-0">
              <button type="submit" className="btn btn-primary" disabled={!(dirty && isValid)}>
                Save
              </button>
              <button type="button" className="btn btn-light ml-4" onClick={handleClose}>
                Cancel
              </button>
            </FormGroup>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ChangePasswordFormNormal;

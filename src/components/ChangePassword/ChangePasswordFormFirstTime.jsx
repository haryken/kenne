import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, FormLabel, InputGroup } from 'react-bootstrap';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { createToast } from '../../utils/createToast';
import { changePassword } from '../../actions';

const ChangePasswordFormFirstTime = ({ handleClose }) => {
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.changePasswordReducer);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isSubmitted) {
      if (!loading) {
        if (error) {
          createToast(error, 'error');
        } else {
          createToast('You have changed your password', 'success');
          handleClose();
        }
        setIsSubmitted(false);
      }
    }
  }, [isSubmitted, loading, error]);

  const initialValues = {
    password: '',
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must have at least 6 characters')
      .max(1024, 'Password length must be below 1024 characters'),
  });

  const onSubmit = (values) => {
    dispatch(changePassword(values));
    setIsSubmitted(true);
  };

  return (
    <>
      <p>This is the first time you login you must change your password to continue</p>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ dirty, isValid }) => (
          <Form className="formContainer" autoComplete="off">
            <FormGroup>
              <FormLabel htmlFor="password">Password: </FormLabel>
              <InputGroup>
                <Field
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="form-control"
                />
                <InputGroup.Text onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </InputGroup.Text>
              </InputGroup>
              <ErrorMessage name="password" component="span" className="error-message" />
            </FormGroup>

            <FormGroup className="text-right mb-0">
              <button disabled={!(dirty && isValid)} type="submit" className="btn btn-primary">
                Change Password
              </button>
            </FormGroup>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ChangePasswordFormFirstTime;

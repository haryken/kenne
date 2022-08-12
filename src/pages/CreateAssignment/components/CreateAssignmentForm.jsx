import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, FormLabel, Row, Col, InputGroup, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { createAssignment } from '../../../actions';
import { createToast } from '../../../utils';
import { DateInput } from '../../../components/DateInput';
import { SelectUserModal } from '../../../components/SelectUserModal';
import { SelectAssetModal } from '../../../components/SelectAssetModal';

const CreateAssignmentForm = () => {
  const history = useHistory();
  const formikRef = useRef();
  const dispatch = useDispatch();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [assigneeID, setAssigneeID] = useState(null);
  const [assetID, setAssetID] = useState(null);
  const [showSelectUserModal, setShowSelectUserModal] = useState(false);
  const [showSelectAssetModal, setShowSelectAssetModal] = useState(false);

  const { users } = useSelector((state) => state.getAllUsersReducer);
  const { assets } = useSelector((state) => state.findAssetsReducer);
  const { loading, error } = useSelector((state) => state.createAssignmentReducer);

  const initialValues = {
    assigneeName: '',
    assetName: '',
    assignedDate: new Date(Date.now()),
    assignmentNote: '',
  };

  useEffect(() => {
    const assignee = assigneeID ? users.find((user) => user.id === assigneeID) : null;

    if (assignee) {
      formikRef.current.setFieldValue('assigneeName', `${assignee.firstName} ${assignee.lastName}`);
    } else {
      formikRef.current.setFieldValue('assigneeName', ``);
    }
  }, [assigneeID]);

  useEffect(() => {
    const asset = assetID ? assets.find((assetItem) => assetItem.id === assetID) : null;

    if (asset) {
      formikRef.current.setFieldValue('assetName', `${asset.assetName}`);
    } else {
      formikRef.current.setFieldValue('assetName', ``);
    }
  }, [assetID]);

  useEffect(() => {
    if (isSubmitted) {
      if (!loading) {
        if (error) {
          createToast(error, 'error');
        } else {
          history.push('/assignments');
        }
        setIsSubmitted(false);
      }
    }
  }, [isSubmitted, loading, error]);

  const onSubmit = (values) => {
    const { assignedDate, assignmentNote } = values;

    dispatch(
      createAssignment({
        assignedTo: assigneeID,
        assignedAsset: assetID,
        assignedDate,
        note: assignmentNote,
      })
    );

    setIsSubmitted(true);
  };

  const onChangeAssignee = (id) => {
    setAssigneeID(id);
  };

  const onChangeAsset = (id) => {
    setAssetID(id);
  };

  const handleCloseSelectUserModal = () => {
    setShowSelectUserModal(false);
  };

  const handleCloseSelectAssetModal = () => {
    setShowSelectAssetModal(false);
  };

  const validationSchema = Yup.object().shape({
    assigneeName: Yup.string().required('User is a required field').max(255),
    assetName: Yup.string().required('Asset is a required field').max(255),
    assignedDate: Yup.date()
      .required('Assigned date is a required field')
      .test(
        'assignedDate',
        'Assigned date can only be current or future date',
        (value) => new Date(value) >= new Date().setHours(0, 0, 0, 0)
      ),
    assignmentNote: Yup.string().max(1024),
  });

  const cancel = () => {
    history.push('/assignments');
  };

  return (
    <>
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, dirty, isValid, values, setFieldValue, setFieldTouched }) => (
          <Form className="formContainer" autoComplete="off">
            <FormGroup as={Row} className="mb-3">
              <FormLabel htmlFor="assigneeName" column sm="3">
                User<sup className="required-icon">*</sup>
              </FormLabel>
              <Col sm="9">
                <InputGroup className="mb-3">
                  <div
                    className="input-overlay"
                    onClick={() => {
                      setShowSelectUserModal(true);
                    }}
                    role="presentation"
                  />
                  <Field id="assigneeName" name="assigneeName" className="form-control" disabled />
                  <Button
                    variant="primary"
                    onClick={() => {
                      setShowSelectUserModal(true);
                    }}
                  >
                    <BsSearch />
                  </Button>
                </InputGroup>
                <ErrorMessage name="assigneeName" component="span" className="error-message" />
              </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3">
              <FormLabel htmlFor="assetName" column sm="3">
                Asset<sup className="required-icon">*</sup>
              </FormLabel>
              <Col sm="9">
                <InputGroup className="mb-3">
                  <div
                    className="input-overlay"
                    onClick={() => {
                      setShowSelectAssetModal(true);
                    }}
                    role="presentation"
                  />
                  <Field id="assetName" name="assetName" className="form-control" disabled />
                  <Button
                    variant="primary"
                    onClick={() => {
                      setShowSelectAssetModal(true);
                    }}
                  >
                    <BsSearch />
                  </Button>
                </InputGroup>
                <ErrorMessage name="lastName" component="span" className="error-message" />
              </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3">
              <FormLabel htmlFor="assignedDate" column sm="3">
                Assigned Date<sup className="required-icon">*</sup>
              </FormLabel>
              <Col sm="9">
                <DateInput
                  type="date"
                  id="assignedDate"
                  name="assignedDate"
                  className="form-control"
                  formikValues={values}
                  formikSetFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                />
                <ErrorMessage name="assignedDate" component="span" className="error-message" />
              </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3">
              <FormLabel htmlFor="assignmentNote" column sm="3">
                Note
              </FormLabel>
              <Col sm="9">
                <Field
                  as="textarea"
                  id="assignmentNote"
                  name="assignmentNote"
                  className="form-control"
                />
                <ErrorMessage name="assignmentNote" component="span" className="error-message" />
              </Col>
            </FormGroup>

            <FormGroup className="text-right mb-0">
              <button
                disabled={!(dirty && isValid) || isSubmitting || loading || isSubmitted}
                type="submit"
                className="btn btn-primary"
              >
                Save
              </button>
              <button
                type="button"
                onClick={cancel}
                className="btn btn-light ml-4"
                disabled={isSubmitting || loading || isSubmitted}
              >
                Cancel
              </button>
            </FormGroup>
          </Form>
        )}
      </Formik>

      <SelectUserModal
        isShowed={showSelectUserModal}
        handleClose={handleCloseSelectUserModal}
        onChangeAssignee={onChangeAssignee}
        assigneeID={assigneeID}
      />

      <SelectAssetModal
        isShowed={showSelectAssetModal}
        handleClose={handleCloseSelectAssetModal}
        onChangeAssignee={onChangeAsset}
        assetID={assetID}
      />
    </>
  );
};

export default CreateAssignmentForm;

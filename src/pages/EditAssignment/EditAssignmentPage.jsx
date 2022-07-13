import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setHeaderTitle } from '../../actions';
import { EditAssignmentForm } from './components';
import './editAssignmentPage.scss';

const CreateAssignmentPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeaderTitle(['Manage Assignment', 'Edit Assignment']));
  }, [dispatch]);

  return (
    <div id="user-form-page">
      <div className="container">
        <h4 className="form-header">Edit Assignment</h4>
        <EditAssignmentForm />
      </div>
    </div>
  );
};

export default CreateAssignmentPage;

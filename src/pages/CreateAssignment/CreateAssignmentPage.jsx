import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setHeaderTitle } from '../../actions';
import { CreateAssignmentForm } from './components';
import './createAssignmentPage.scss';

const CreateAssignmentPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeaderTitle(['Manage Assignment', 'Create New Assignment']));
  }, [dispatch]);

  return (
    <div id="user-form-page">
      <div className="container">
        <h4 className="form-header">Create New Assignment</h4>
        <CreateAssignmentForm />
      </div>
    </div>
  );
};

export default CreateAssignmentPage;

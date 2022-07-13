import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setHeaderTitle } from '../../actions';
import CreateUserForm from './components/CreateUserForm';
import './createUserPage.scss';

const CreateUserPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeaderTitle(['Manage User', 'Create New User']));
  }, [dispatch]);

  return (
    <div id="user-form-page">
      <div className="container">
        <h4 className="form-header">Create New User</h4>
        <CreateUserForm />
      </div>
    </div>
  );
};

export default CreateUserPage;

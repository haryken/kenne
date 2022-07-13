import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setHeaderTitle } from '../../actions/headerActions';
import UpdateForm from './components/UpdateForm';
import './Add.css';

export default function Update() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeaderTitle(['Manage Asset', 'Edit Asset']));
  }, [dispatch]);

  return (
    <div id="add-asset">
      <div className="container">
        <h2 className="form-header">Edit Asset</h2>

        <UpdateForm />
      </div>
    </div>
  );
}

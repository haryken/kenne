import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setHeaderTitle } from '../../actions/headerActions';
import AddForm from './components/AddForm';
import './Add.css';

export default function Add() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeaderTitle(['Manage Asset', 'Create New Asset']));
  }, [dispatch]);

  return (
    <div id="add-asset">
      <div className="container">
        <h2 className="form-header">Create New Asset</h2>

        <AddForm />
      </div>
    </div>
  );
}

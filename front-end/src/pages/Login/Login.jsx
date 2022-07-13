import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Card } from 'react-bootstrap';
import { setHeaderTitle } from '../../actions/headerActions';
import { LoginForm } from './components';

const Login = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeaderTitle(['Login']));
  }, [dispatch]);

  return (
    <div id="login-page">
      <div className="container">
        <Card>
          <Card.Header>Login</Card.Header>
          <Card.Body>
            <LoginForm />
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Login;

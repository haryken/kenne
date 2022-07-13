import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHeaderTitle } from '../../actions/headerActions';
import { ChangePasswordModal } from '../../components/ChangePassword';

const HomePage = () => {
  const { userData } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeaderTitle(['Home']));
  }, [dispatch]);

  const renderChangePasswordModal = () => {
    if (userData && userData.firstTimeLogin) {
      return <ChangePasswordModal isShow />;
    }
    return <></>;
  };

  return (
    <div id="home-page">
      {renderChangePasswordModal()}
      <h1>Home Page</h1>
    </div>
  );
};

export default HomePage;

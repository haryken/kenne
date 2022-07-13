import React, { useState, useEffect } from 'react';
import { Container, Dropdown, DropdownButton } from 'react-bootstrap';
import './header.scss';
import { useSelector } from 'react-redux';
import { generateHeaderTitle, validateUserData } from '../../utils';
import { LogoutModal } from '../LogoutModal';
import { ChangePasswordModal } from '../ChangePassword';

const Header = () => {
  const { headerTitle } = useSelector((state) => state.headerTitleReducer);
  const { userData } = useSelector((state) => state.authReducer);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(
    userData ? userData.firstTimeLogin : false
  );

  useEffect(() => {
    setShowChangePasswordModal(userData ? userData.firstTimeLogin : false);
  }, [userData]);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const getUsername = () => {
    if (validateUserData(userData)) return '';

    return userData.user.username;
  };

  const renderUserDropdownButton = () => {
    if (userData && userData.user && userData.user.username && userData.token) {
      return (
        <div className="header__user">
          <DropdownButton id="dropdown-item-button" title={getUsername()}>
            <Dropdown.ItemText>Hello, {getUsername()}</Dropdown.ItemText>
            <Dropdown.Item as="button" onClick={() => setShowChangePasswordModal(true)}>
              Change Password
            </Dropdown.Item>
            <Dropdown.Item as="button" onClick={() => setShowLogoutModal(true)}>
              Logout
            </Dropdown.Item>
          </DropdownButton>
        </div>
      );
    }

    return <></>;
  };

  return (
    <div id="header">
      <Container>
        <div className="row">
          <div className="header__title">{generateHeaderTitle(headerTitle)}</div>

          {renderUserDropdownButton()}
        </div>
      </Container>

      <LogoutModal isShowed={showLogoutModal} setShowLogoutModal={setShowLogoutModal} />
      <ChangePasswordModal
        isShowed={showChangePasswordModal}
        setShowChangePasswordModal={setShowChangePasswordModal}
      />
    </div>
  );
};

export default Header;

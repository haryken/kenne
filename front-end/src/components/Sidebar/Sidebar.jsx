import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import shortid from 'shortid';
import logo from '../../assets/nastech_logo.png';
import { adminNavList, staffNavList, anonymousNavList } from '../../constants';
import { validateUserData } from '../../utils';
import './sidebar.scss';

const Sidebar = () => {
  const { pathname } = useLocation();
  const { userData } = useSelector((state) => state.authReducer);

  const getNavListBasedOnUserType = () => {
    if (validateUserData(userData)) {
      return anonymousNavList;
    }

    if (userData && userData.user.userType === 'Admin') {
      return adminNavList;
    }
    if (userData && userData.user.userType === 'Staff') {
      return staffNavList;
    }

    return anonymousNavList;
  };

  const renderNavItems = () => {
    const navList = getNavListBasedOnUserType();

    return navList.map((navItem) => (
      <li className="sidebar__item" key={shortid.generate()}>
        <NavLink
          exact
          className="sidebar__link"
          to={navItem.path}
          isActive={() =>
            navItem.matchingRoutes.find((navItemRoute) => {
              if (navItemRoute === '/' && pathname !== '/') {
                return false;
              }
              return pathname.includes(navItemRoute);
            })
          }
        >
          {navItem.name}
        </NavLink>
      </li>
    ));
  };

  return (
    <div id="sidebar">
      <div className="sidebar__header">
        <img src={logo} alt="Logo" className="img-fluid" />
        <h4>Online Asset Management</h4>
      </div>

      <div className="sidebar__body">
        <ul className="sidebar__list">{renderNavItems()}</ul>
      </div>
    </div>
  );
};

export default Sidebar;

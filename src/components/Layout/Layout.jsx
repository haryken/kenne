import React from 'react';
import { Container } from 'react-bootstrap';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';
import './layout.scss';

const Layout = ({ children }) => (
  <div id="layout">
    <Header headerTitle="Home" />
    <Container>
      <div className="row layout__row">
        <Sidebar />
        <main>{children}</main>
      </div>
    </Container>
  </div>
);

export default Layout;

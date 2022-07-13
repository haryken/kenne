import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Layout } from './components/Layout';
import { Add, Update } from './pages/Asset';
import { LoginPage } from './pages/Login';
import { CreateUserPage } from './pages/CreateUser';
import { CreateAssignmentPage } from './pages/CreateAssignment';
import UserList from './pages/ListUser/UserList';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { enumUserTypes } from './utils';
import { EditUserPage } from './pages/EditUser';
import { ManageAssets } from './pages/ManageAssets';
import { EditAssignmentPage } from './pages/EditAssignment';
import { ViewListAssignment, ViewOwnAssignment } from './pages/ViewAssignment';
import { ViewListRequestForReturning } from './pages/ViewRequestForReturning';
import { ViewReport } from './pages/ManageReport';

const { ADMIN, STAFF } = enumUserTypes;

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <ToastContainer />
          <Switch>
            <PrivateRoute exact path="/" component={ViewOwnAssignment} roles={[ADMIN, STAFF]} />
            <Route exact path="/login" component={LoginPage} />
            <PrivateRoute exact path="/users" component={UserList} roles={[ADMIN]} />
            <PrivateRoute exact path="/users/create" component={CreateUserPage} roles={[ADMIN]} />
            <PrivateRoute exact path="/users/edit/:id" component={EditUserPage} roles={[ADMIN]} />
            <PrivateRoute exact path="/assets" component={ManageAssets} roles={[ADMIN]} />
            <PrivateRoute exact path="/assets/create" component={Add} roles={[ADMIN]} />
            <PrivateRoute exact path="/assets/edit/:id" component={Update} roles={[ADMIN]} />
            <PrivateRoute
              exact
              path="/assignments"
              component={ViewListAssignment}
              roles={[ADMIN]}
            />
            <PrivateRoute
              exact
              path="/assignments/create"
              component={CreateAssignmentPage}
              roles={[ADMIN]}
            />
            <PrivateRoute
              exact
              path="/assignments/edit/:id"
              component={EditAssignmentPage}
              roles={[ADMIN]}
            />
            <PrivateRoute exact path="/report" component={ViewReport} roles={[ADMIN]} />
            <PrivateRoute
              exact
              path="/requests"
              component={ViewListRequestForReturning}
              roles={[ADMIN]}
            />
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;

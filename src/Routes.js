import React from "react";
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';

import LoginPage from './pages/auth/LogIn';
import RegisterPage from './pages/auth/Register';
import DashboardPage from './pages/dashboard';

export const Routes = () => (
    <Switch>
        <Route exact component={LoginPage} path='/' />
        <Route exact component={RegisterPage} path='/register' />
        <PrivateRoute exact component={DashboardPage} path='/dashboard' />
        <Route path='*'>
            Not Found
        </Route>
    </Switch>
);

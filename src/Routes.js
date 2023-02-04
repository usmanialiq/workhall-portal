import React from "react";
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';

import LoginPage from './pages/auth/LogIn';
import RegisterPage from './pages/auth/Register';
import DashboardPage from './pages/dashboard';
import UserList from './components/Users/List';
import LocationList from "./components/Locations/List";
import CreateLocation from "./components/Locations/Create";
import InventoryList from "./components/Inventory/List";
import CreateInventory from "./components/Inventory/Create";
import BookingList from "./components/Bookings/List";

export const Routes = () => (
    <Switch>
        <Route exact component={LoginPage} path='/' />
        <Route exact component={RegisterPage} path='/register' />
        <PrivateRoute exact component={DashboardPage} path='/dashboard' />
        <PrivateRoute exact component={UserList} path='/users' />
        <PrivateRoute exact component={LocationList} path='/locations' />
        <PrivateRoute exact component={CreateLocation} path='/locations/new' />
        <PrivateRoute exact component={CreateLocation} path='/locations/:id' />
        <PrivateRoute exact component={InventoryList} path='/inventory' />
        <PrivateRoute exact component={CreateInventory} path='/inventory/new' />
        <PrivateRoute exact component={CreateInventory} path='/inventory/:id' />
        <PrivateRoute exact component={BookingList} path='/bookings' />
        <Route path='*'>
            Not Found
        </Route>
    </Switch>
);

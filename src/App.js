import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './Routes';
import jwt_decode from "jwt-decode";
import './App.css';

import setAuthToken from './utils/setAuthToken';
import store from './store';
import { setCurrentUser, logoutUser } from './store/actions/auth';

const token = localStorage.getItem('accessToken');

if (token) {
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
  }
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;

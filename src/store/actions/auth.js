import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';
import { login } from '../../config/api-routes';
import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Login - Get User Token
export const loginUser = userData => async dispatch => {
	try {
		const { data } = await axios.post(login, userData);
		const { accessToken, id, name, email, type } = data;
		// if(user.type === 'admin') {
		// Set Token to local storage
		localStorage.setItem('accessToken', accessToken);
		localStorage.setItem('id', id);
		localStorage.setItem('name', name);
		localStorage.setItem('email', email);
		localStorage.setItem('type', type);

		// Set Token to auth header
		setAuthToken(accessToken);

		// Decode Token to get User Data
		const decoded = jwt_decode(accessToken);
		dispatch(setCurrentUser(decoded));
		// }
		// else {
		// 	dispatch({
		// 		type: GET_ERRORS,
		// 		payload: {
		// 			message: 'User is not allowed to access this resource'
		// 		}
		// 	});
		// }
	} catch (error) {
		dispatch({
			type: GET_ERRORS,
			payload: error.response.data,
		});
	}
};

// Set Logged in User
export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded,
	};
};

// Log Uer Out
export const logoutUser = (history) => dispath => {
	// Remove token from local storage
	localStorage.removeItem('accessToken');
	localStorage.removeItem('name');
	localStorage.removeItem('id');
	localStorage.removeItem('email');
	localStorage.removeItem('type');

	// remove auth header for future requests
	setAuthToken(false);
	// set the current user to {} which will also set isAuthenticated: false
	dispath(setCurrentUser({}));
	window.location.href = '/';
};
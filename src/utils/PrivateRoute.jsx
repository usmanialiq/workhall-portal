import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Layout from '../layout';

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props =>
				auth.isAuthenticated ? (
					<Layout {...props}>
						<Component {...props} />
					</Layout>
				) : (
					<Redirect to='/' />
				)
			}
		/>
	);
};

PrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
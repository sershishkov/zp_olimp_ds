import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
const PrivateRoute = ({ component: Component, state_auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !state_auth.isAuthenticated && !state_auth.loading ? (
        <Redirect to='/' />
      ) : (
        <Component {...props} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  state_auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  state_auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);

import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as actions from '../features/auth/redux/actions';

const PrivateRoute = ({ component: Component, redirect: pathname, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect
            to={{
              pathname,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

PrivateRoute.defaultProps = { redirect: '/auth/signin' };

PrivateRoute.propTypes = {
  redirect: PropTypes.string,
};

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRoute);

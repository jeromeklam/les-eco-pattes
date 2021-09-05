import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { FormattedMessage } from 'react-intl';
import { Home as HomeIcon } from '../icons';
import * as actions from './redux/actions';
import logo from '../../images/logo-les-eco-pattes.jpg';

export class PageError extends Component {
  static propTypes = {
    ui: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.goHome = this.goHome.bind(this);
  }

  goHome(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    this.props.actions.push('/');
  }

  render() {
    const path =
      this.props.history && this.props.history.location && this.props.history.location.pathname;
    return (
      <div className="common-page-error text-right p-4">
        <div className="about-about container-fluid pt-5">
          <img className="common-page-error-logo" src={logo} alt="" />
          <hr />
          <div className="jumbotron p-2 p-md-15 text-white rounded bg-warning">
            <div className="col-xs-w36 px-0">
              <h2 className="display-32 font-italic text-center">
                <FormattedMessage id="app.features.common.error" defaultMessage="Error" />
              </h2>
              <h2 className="display-32 font-italic text-center">
                <FormattedMessage id="app.features.common.cnxerror" defaultMessage="Error" />
              </h2>
              <p className="text-center">{path}</p>
            </div>
          </div>
          <br />
          <div className="text-right">
            <a href="/" className="btn btn-lg text-secondary">
              <span className="glyphicon glyphicon-home" />
              <FormattedMessage id="app.features.common.back" defaultMessage="Back" /> <HomeIcon />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ui: state.ui,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, push }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PageError);

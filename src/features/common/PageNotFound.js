import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { FormattedMessage } from 'react-intl';
import { Home as HomeIcon } from '../icons';
import * as actions from './redux/actions';

export class PageNotFound extends Component {
  static propTypes = {
    ui: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
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
    const path = this.props.history && this.props.history.location && this.props.history.location.pathname;
    return (
      <div className="common-page-not-found">
        <div className="about-about container-fluid pt-5">
          <div className="jumbotron p-9 p-md-15 text-white rounded bg-warning">
            <div className="col-xs-w36 px-0">
              <h1 className="display-32 font-italic text-center">
                <FormattedMessage
                  id="app.features.common.notfound"
                  defaultMessage="Page not found"
                />
              </h1>
              <p className="text-center">{path}</p>
              <div className="text-right">
                <a href="/" onClick={this.goHome} className="btn btn-lg text-white">
                  <span className="glyphicon glyphicon-home" />
                  Retour à l'accueil <HomeIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    ui: state.ui,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, push }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageNotFound);

import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getJsonApi } from 'jsonapi-front';
import * as actions from './redux/actions';
import { updateConfig } from '../auth/redux/actions';
import { 
  Save as SaveIcon, 
  Reload as ReloadIcon,
  DashboardReset as ResetIcon } from '../icons';
import { modifySuccess, showErrors } from '../ui';
import { getFromLS } from '../ui';

export class DashboardToolbar extends Component {
  static propTypes = {
    dashboard: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.onRefreshDashboard = this.onRefreshDashboard.bind(this);
    this.onSaveDashboard = this.onSaveDashboard.bind(this);
    this.onResetDashboard = this.onResetDashboard.bind(this);
  }

  onRefreshDashboard(evt) {
    if (evt) {
      evt.preventDefault();
    }
    this.props.actions.loadMore();
  }

  onSaveDashboard(evt) {
    if (evt) {
      evt.preventDefault();
    }
    const originalLayouts = getFromLS('layouts') || {} ;
    const datas = {
      type: 'FreeSSO_ConfigRequest',
      config: JSON.stringify(originalLayouts),
      config_type: 'cache',
    };
    let obj = getJsonApi(datas);
    this.props.actions
      .updateConfig(obj)
      .then(result => {
        modifySuccess();
      })
      .catch(errors => {
        showErrors(this.props.intl, errors, 'updateOneError');
      });
  }

  onResetDashboard() {
    this.props.onResetLayout();
  }

  render() {
    return (
      <div className="dashboard-dashboard-toolbar">
        <div className="row row-short">
          <div className="col-36 text-right">
            <div className="nav justify-content-end">
              <div className="nav-item">
                <button className="btn btn-primary text-light" title="Recharger votre présentation personnalisée" onClick={this.onRefreshDashboard}>
                  <ReloadIcon />
                </button>
                <button className="btn btn-primary text-light" title="Revenir à la présentation initiale" onClick={this.onResetDashboard}>
                  <ResetIcon />
                </button>
                <button className="btn btn-primary text-light" title="Enregistrer cette présentation personnalisée" onClick={this.onSaveDashboard}>
                  <SaveIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    dashboard: state.dashboard,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, updateConfig }, dispatch)
  };
}

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardToolbar));

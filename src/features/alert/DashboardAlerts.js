import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { normalizedObjectModeler } from 'jsonapi-front';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Alert as AlertIcon } from '../icons';
import { CenteredLoading3Dots, StatCard } from '../ui';

export class DashboardAlerts extends Component {
  static propTypes = {
    alert: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.actions.loadMore();
  }

  render() {
    let alerts = [];
    if (this.props.alert.items.FreeAsso_Alert) {
      alerts = normalizedObjectModeler(this.props.alert.items, 'FreeAsso_Alert');
    }
    return (
      <StatCard title="Alertes" icon={<AlertIcon />} size="md">
        <div className="alerts text-secondary bg-secondary-light">
          {alerts && alerts.length > 0 ? (
            <div className="inline-list">
              <div className="row row-title"></div>
            </div>
          ) : (
            <div>
              <span className="p-3">Aucune alerte en attente</span>
            </div>
          )}
          {this.props.alert.loadMorePending && (
            <div className="inline-list">
              <div className="row row-line">
                <div className="col-xs-w36 text-center">
                  <CenteredLoading3Dots />
                </div>
              </div>
            </div>
          )}
        </div>
      </StatCard>
    );
  }
}

function mapStateToProps(state) {
  return {
    alert: state.alert,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardAlerts);

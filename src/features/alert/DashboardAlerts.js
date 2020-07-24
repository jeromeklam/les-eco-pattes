import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { normalizedObjectModeler } from 'freejsonapi';
import { Loading3Dots } from 'freeassofront';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { StatCard } from '../ui';
import { Alert as AlertIcon } from '../icons';

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
                <div className="col-36 text-center">
                  <Loading3Dots />
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

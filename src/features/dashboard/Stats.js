import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { StatCard } from '../layout';
import { Site as SiteIcon, Cause as CauseIcon } from '../icons';

export class Stats extends Component {
  static propTypes = {
    dashboard: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="dashboard-stats ">
        {this.props.dashboard.stats ? (
          <div className="row">
            <StatCard
              title="Animaux"
              count={this.props.dashboard.stats.total_cause}
              icon={<CauseIcon />}
              url="/cause"
            />
            <StatCard
              title="Sites"
              count={this.props.dashboard.stats.total_site}
              icon={<SiteIcon />}
              url="/site"
            />
            <StatCard
              title="Surface"
              count={this.props.dashboard.stats.area_site}
              icon={<SiteIcon />}
            />
            <StatCard
              title="Clôture"
              count={this.props.dashboard.stats.clot_site}
              icon={<SiteIcon />}
            />
          </div>
        ) : (
          <div className="row"></div>
        )}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    dashboard: state.dashboard,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats);

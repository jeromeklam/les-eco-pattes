import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { StatCard } from '../ui';
import { 
  Site as SiteIcon, 
  Cause as CauseIcon,
  Area as AreaIcon,
  Fence as FenceIcon
} from '../icons';

export class Stats extends Component {
  static propTypes = {
    dashboard: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="dashboard-stats">
        {(this.props.auth.authenticated  && this.props.dashboard.stats) ? (
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
              unit="m2"
              icon={<AreaIcon />}
            />
            <StatCard
              title="Clôtures"
              count={this.props.dashboard.stats.clot_site}
              unit="m"
              icon={<FenceIcon />}
            />
          </div>
        ) : (
          <div className="row"></div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    dashboard: state.dashboard,
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats);

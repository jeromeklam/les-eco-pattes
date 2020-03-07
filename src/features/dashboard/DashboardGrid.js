import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GridLayout from 'react-grid-layout';
import { ResponsiveGridCard } from '../ui';
import { PendingMovements } from '../cause-movement';
import { PendingSicknesses } from '../cause-sickness';
import * as actions from './redux/actions';
import {
  Site as SiteIcon,
  Cause as CauseIcon,
  Area as AreaIcon,
  Fence as FenceIcon,
} from '../icons';
import { DashboardCard } from './';

const initialLayout = [
  { i: 'cause', x: 0, y: 0, w: 6, h: 4, minW: 4, maxW: 6, minH: 2, maxH: 6 },
  { i: 'site', x: 7, y: 0, w: 6, h: 4, minW: 4, maxW: 8, minH: 2, maxH: 6 },
  { i: 'm2', x: 15, y: 0, w: 6, h: 4, minW: 4, maxW: 8, minH: 2, maxH: 6 },
  { i: 'm', x: 23, y: 0, w: 6, h: 4, minW: 4, maxW: 8, minH: 2, maxH: 6 },
  { i: 'movements', x: 0, y: 8, w: 16, h: 6, minW: 12, maxW: 36, minH: 4, maxH: 20 },
  { i: 'sicknesses', x: 18, y: 8, w: 16, h: 6, minW: 12, maxW: 36, minH: 4, maxH: 20 },
];

const getLayoutSize = (layouts, key) => {
  let size = 'sm';
  const layout = layouts.find(elem => elem.i === key);
  if (layout) {
    if (layout.w < 9) {
      size = 'sm';
    } else {
      if (layout.w < 18) {
        size = 'md';
      } else {
        if (layout.w < 27) {
          size = 'lg';
        } else {
          size = 'xl';
        }
      }
    }
  }
  return size;
};

export class DashboardGrid extends Component {
  static propTypes = {
    dashboard: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      layouts: initialLayout,
    }
    this.onResize = this.onResize.bind(this);
  }

  onResize(layouts) {
    this.setState({ layouts: layouts });
  }

  render() {
    const { layouts } = this.state;
    if (this.props.auth.authenticated && this.props.dashboard.stats) {
      return (
        <GridLayout
          className="layout"
          cols={36}
          rowHeight={30}
          width={1200}
          verticalCompact={true}
          onResize={this.onResize}
          layout={layouts}
        >
          <div key="cause">
            <DashboardCard
              title="Animaux"
              count={this.props.dashboard.stats.total_cause}
              icon={<CauseIcon />}
              url="/cause"
              size={getLayoutSize(layouts, 'cause')}
            />
          </div>
          <div key="site">
            <DashboardCard
              title="Sites"
              count={this.props.dashboard.stats.total_site}
              icon={<SiteIcon />}
              url="/site"
              size={getLayoutSize(layouts, 'site')}
            />
          </div>
          <div key="m2">
            <DashboardCard
              title="Surface"
              count={this.props.dashboard.stats.area_site}
              unit="m2"
              icon={<AreaIcon />}
              size={getLayoutSize(layouts, 'm2')}
            />
          </div>
          <div key="m">
            <DashboardCard
              title="Clôtures"
              count={this.props.dashboard.stats.clot_site}
              unit="m"
              icon={<FenceIcon />}
              size={getLayoutSize(layouts, 'm')}
            />
          </div>
          <div key="movements">
            <PendingMovements layoutSize={getLayoutSize(layouts, 'movements')} />
          </div>
          <div key="sicknesses">
            <PendingSicknesses layoutSize={getLayoutSize(layouts, 'sicknesses')} />
          </div>
        </GridLayout>
      );
    }
    return null;
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    dashboard: state.dashboard,
    auth: state.auth,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardGrid);

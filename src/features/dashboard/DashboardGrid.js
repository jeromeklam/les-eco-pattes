import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { PendingMovements } from '../cause-movement';
import { PendingSicknesses } from '../cause-sickness';
import * as actions from './redux/actions';
import {
  Site as SiteIcon,
  Cause as CauseIcon,
  Area as AreaIcon,
  Fence as FenceIcon,
} from '../icons';
import { DashboardCard, DashboardToolbar } from './';
import { getFromLS, saveToLS } from '../ui';

const getLayoutSize = (layouts, breakpoint, key) => {
  let size = 'sm';
  const layoutBr = layouts[breakpoint] || [];
  if (Array.isArray(layoutBr)) {
    const layout = layoutBr.find(elem => elem.i === key);
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
  }
  return size;
};

const ResponsiveReactGridLayout = WidthProvider(Responsive, { measureBeforeMount: true });

export class DashboardGrid extends Component {
  static propTypes = {
    dashboard: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    const originalLayouts = props.auth.cache || getFromLS('layouts') || {};
    this.state = {
      breakpoint: 'lg',
      layouts: JSON.parse(JSON.stringify(originalLayouts)),
    };
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.onResizeStop = this.onResizeStop.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
  }

  onLayoutChange(layout, layouts) {
    saveToLS('layouts', layouts);
    this.setState({ layouts });
  }

  onBreakpointChange(breakpoint) {
    this.setState({ breakpoint });
  }

  onResizeStop(param1, param2) {
  }

  render() {
    const { layouts, breakpoint } = this.state;
    console.log("FK totaux ",this.props.dashboard.stats);
    if (this.props.auth.authenticated && this.props.dashboard.stats) {
      return (
        <div>
          <DashboardToolbar />
          <ResponsiveReactGridLayout
            className="layout p-2"
            cols={{ lg: 36, md: 36, sm: 36, xs: 36, xxs: 36 }}
            rowHeight={30}
            verticalCompact={true}
            onResize={this.onResize}
            onLayoutChange={this.onLayoutChange}
            onResizeStop={this.onResizeStop}
            onBreakpointChange={this.onBreakpointChange}
            draggableHandle=".card-header"
            layouts={layouts}
          >
            <div key="cause" data-grid={{ w: 6, h: 5, x: 1, y: 1, minW: 6, maxW: 18, minH: 4 }}>
              <DashboardCard
                title="Animaux"
                count={this.props.dashboard.stats.total_cause}
                icon={<CauseIcon />}
                url="/cause"
                size={getLayoutSize(layouts, breakpoint, 'cause')}
              />
            </div>
            <div key="site" data-grid={{ w: 6, h: 5, x: 8, y: 1, minW: 6, maxW: 18, minH: 4 }}>
              <DashboardCard
                title="Sites"
                count={this.props.dashboard.stats.total_site}
                icon={<SiteIcon />}
                url="/site"
                size={getLayoutSize(layouts, breakpoint, 'site')}
              />
            </div>
            <div key="m2" data-grid={{ w: 6, h: 5, x: 15, y: 1, minW: 6, maxW: 18, minH: 4 }}>
              <DashboardCard
                title="Surface"
                count={this.props.dashboard.stats.area_site}
                unit="m2"
                icon={<AreaIcon />}
                size={getLayoutSize(layouts, breakpoint, 'm2')}
              />
            </div>
            <div key="m" data-grid={{ w: 6, h: 5, x: 22, y: 1, minW: 6, maxW: 18, minH: 4 }}>
              <DashboardCard
                title="Clôtures"
                count={this.props.dashboard.stats.clot_site}
                unit="m"
                icon={<FenceIcon />}
                size={getLayoutSize(layouts, breakpoint, 'm')}
              />
            </div>
            <div key="movements" data-grid={{ w: 36, h: 6, x: 1, y: 10, minW: 12, minH: 4 }}>
              <PendingMovements layoutSize={getLayoutSize(layouts, breakpoint, 'movements')} />
            </div>
            <div key="sicknesses" data-grid={{ w: 36, h: 6, x: 1, y: 20, minW: 12, minH: 4 }}>
              <PendingSicknesses layoutSize={getLayoutSize(layouts, breakpoint, 'sicknesses')} />
            </div>
          </ResponsiveReactGridLayout>
        </div>
      );
    }
    return null;
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardGrid);

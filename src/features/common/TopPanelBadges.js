import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Menu as MenuIcon, Filter as FilterIcon } from '../icons';
import { HeaderBadge } from '../inbox';

export class TopPanelBadges extends Component {
  static propTypes = {
    common: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="common-top-panel-badges w-100">
        <ul className="nav nav-tabs">
          {Array.isArray(this.props.common.filtersCols) && (
            <li className="nav-item">
              <div
                className={classnames('nav-link', this.props.common.panel === 'filter' && 'active')}
                onClick={ev => this.props.actions.setPanel('filter')}
              >
                <FilterIcon />
              </div>
            </li>
          )}
          <li className="nav-item">
            <HeaderBadge
              className={classnames('nav-link', this.props.common.panel === 'inbox' && 'active')}
              onClick={ev => this.props.actions.setPanel('inbox')}
            />
          </li>
          <li className="nav-item">
            <button
              className="btn btn-humburger"
              onClick={this.props.actions.toggleRightPanel}
              id="menu-toggle"
            >
              <MenuIcon className="secondary" />
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    common: state.common,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopPanelBadges);

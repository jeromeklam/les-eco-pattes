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
          {this.props.common.panelObj !== '' && (
            <li className="nav-item">
              <button
                className={classnames('nav-link', this.props.common.panel === 'filter' && 'active')}
                onClick={ev => this.props.actions.setPanel('filter')}
              >
                <FilterIcon />
              </button>
            </li>
          )}
          <li className="nav-item">
            <HeaderBadge
              className={classnames('nav-link', this.props.common.panel === 'inbox' && 'active')}
              onClick={ev => this.props.actions.setPanel('inbox')}
            />
          </li>
        </ul>
        <div className="btn-humburger-wrapper">
          <button
            className="btn btn-humburger"
            onClick={this.props.actions.toggleRightPanel}
            id="menu-toggle"
          >
            <MenuIcon className="secondary" />
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    common: state.common,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopPanelBadges);

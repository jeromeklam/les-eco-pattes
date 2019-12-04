import React, { Component } from 'react';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class DesktopListTitle extends Component {
  static propTypes = {};

  render() {
    return (
      <div className={classnames(this.props.common.sidebar && "common-desktop-list-header-menu","row data-list row-list-titles")}>
        {this.props.cols.map(oneCol => {
          return (
            <div key={oneCol.name} className={classnames('col-' + oneCol.size, 'col-vertical-align')}>
              <span>{oneCol.label}</span>
            </div>
          )
        })}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    common: state.common,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DesktopListTitle);

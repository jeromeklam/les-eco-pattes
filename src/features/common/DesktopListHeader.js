import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { ButtonAddOne, ButtonReload } from '../layout';

export class DesktopListHeader extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onReload: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className={classnames(this.props.common.sidebar && "common-desktop-list-header-menu", "common-desktop-list-header row row-list-title")}>
        <div className="col-26">
          <span>{this.props.title}</span>
        </div>
        <div className="col-10 text-right">
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <ButtonReload color="white" onClick={this.props.onReload} />
            </li>
            <li className="nav-item">
              <ButtonAddOne color="white" onClick={this.props.onCreate} />
            </li>
          </ul>
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
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DesktopListHeader);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ButtonAddOne, ButtonReload } from '../layout';

export default class MobileListHeader extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onReload: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className="row row-list-title common-mobile-list-header">
        <div className="col-20">
          <span>{this.props.title}</span>
        </div>
        <div className="col-16 text-right">
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

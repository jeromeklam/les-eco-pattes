import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MobileListLines extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.bool
    ])
  };

  render() {
    return (
      <div className="row-list data-list">
        {(this.props.children && this.props.children.length > 0) ? (
          <div>
           {this.props.children}
          </div>
        ) : (
          <div className="row-list data-list">
            <div className="col-36">
              <span>Liste vide.</span>
            </div>
          </div>
        )}
      </div>
    );
  }
}

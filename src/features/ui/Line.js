import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export default class Line extends Component {
  static propTypes = {
    header: PropTypes.bool,
    oddEven: PropTypes.number,
  };

  static defaultProps = {
    header: false,
    oddEven: 0,
  };

  render() {
    let className = '';
    if (this.props.header) {
      className += 'row-title';
    } else {
      if (this.props.oddEven % 2 !== 1) {
        className += 'row-odd';
      } else {
        className += 'row-even';
      }
    }
    return (
      <div className={classnames('row row-line', className)}>
        {this.props.children}
      </div>
    );
  }
}

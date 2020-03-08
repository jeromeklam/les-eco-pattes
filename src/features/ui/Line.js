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
    return (
      <div className={classnames('row row-line', this.props.header && 'row-title', (this.props.oddEven % 2 !== 1) ? 'row-odd' : 'row-even')}>
        {this.props.children}
      </div>
    );
  }
}

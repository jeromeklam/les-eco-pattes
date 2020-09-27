
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loading3Dots } from 'react-bootstrap-front';

export default class CenteredLoading3Dots extends Component {
  static propTypes = {
    show: PropTypes.bool,
  };
  static defaultProps = {
    show: true,
  };

  render() {
    if (this.props.show) {
      return (
        <div className="text-center pt-2 text-primary">
          <Loading3Dots />
        </div>
      );
    }
    return null;
  }
}

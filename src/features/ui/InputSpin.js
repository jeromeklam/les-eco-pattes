import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputSpin as RBFInputSpin } from 'react-bootstrap-front';
import { Up as UpIcon, Down as DownIcon, DelOne as DelOneIcon } from '../icons';

export default class InputSpin extends Component {
  static propTypes = {
    clear: PropTypes.bool,
  };
  static defaultProps = {
    clear: true,
};

  render() {
    return (
      <RBFInputSpin 
        {...this.props} 
        upIcon={<UpIcon />} 
        downIcon={<DownIcon />} 
        clearIcon={this.props.clear ? <DelOneIcon /> : null} />
    );
  }
}

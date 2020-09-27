import React, { Component } from 'react';
import { InputSpin as FAInputSpin } from 'react-bootstrap-front';
import { Up as UpIcon, Down as DownIcon, DelOne as DelOneIcon } from '../icons';

export default class InputSpin extends Component {

  render() {
    return (
      <FAInputSpin {...this.props} upIcon={<UpIcon />} downIcon={<DownIcon />} clearIcon={<DelOneIcon />} />
    );
  }
}

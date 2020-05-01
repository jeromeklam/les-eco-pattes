import React, { Component } from 'react';
import { InputStringarray as FAInputStringarray } from 'freeassofront';
import { Plus, Minus } from '../icons';

export default class InputStringarray extends Component {
  render() {
    return (
      <FAInputStringarray
        minusIcon={<Minus />}
        plusIcon={<Plus />}
        {...this.props}
      />
    );
  }
}

import React, { Component } from 'react';
import { InputStringarray as RBFInputStringarray } from 'react-bootstrap-front';
import { Plus, Minus } from '../icons';

export default class InputStringarray extends Component {
  render() {
    return (
      <RBFInputStringarray
        minusIcon={<Minus className="text-warning"/>}
        plusIcon={<Plus className="text-primary" />}
        {...this.props}
      />
    );
  }
}

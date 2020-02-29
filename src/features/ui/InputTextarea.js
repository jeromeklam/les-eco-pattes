import React, { Component } from 'react';
import { InputTextarea as FAInputTextarea } from 'freeassofront';
import { Toolbar as ToolbarIcon, DelOne as DelOneIcon } from '../icons';

export default class InputTextarea extends Component {
  render() {
    return (
      <FAInputTextarea
        {...this.props}
        toolbarIcon={<ToolbarIcon className="text-secondary" size={0.9} />}
        clearIcon={<DelOneIcon className="text-warning" size={0.9} />}
      />
    );
  }
}

import React, { Component } from 'react';
import Icon from '@mdi/react';
import {
  mdiGate
} from '@mdi/js';

export default class Fence extends Component {
  static propTypes = { };

  render() {
    return (
      <Icon 
        path={mdiGate}
        size={1}
        {...this.props}
      />
    );
  }
}
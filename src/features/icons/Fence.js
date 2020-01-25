import React, { Component } from 'react';
import { mdiGate } from '@mdi/js';
import { Icon } from './';

export default class Fence extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiGate} {...this.props} />;
  }
}

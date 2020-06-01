import React, { Component } from 'react';
import { mdiSync as myIcon } from '@mdi/js';
import { Icon } from './';

export default class SocketConnected extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

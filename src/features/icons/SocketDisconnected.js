import React, { Component } from 'react';
import { mdiSyncOff as myIcon } from '@mdi/js';
import { Icon } from './';

export default class SocketDisconnected extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

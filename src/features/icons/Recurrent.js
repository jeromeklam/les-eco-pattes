import React, { Component } from 'react';
import { mdiSyncAlert as myIcon } from '@mdi/js';
import { Icon } from './';

export default class Recurrent extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}
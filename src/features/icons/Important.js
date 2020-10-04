import React, { Component } from 'react';
import { mdiAlertCircle as myIcon } from '@mdi/js';
import { Icon } from './';

export default class Important extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}
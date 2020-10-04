import React, { Component } from 'react';
import { mdiClipboardList as myIcon } from '@mdi/js';
import { Icon } from './';

export default class Task extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}
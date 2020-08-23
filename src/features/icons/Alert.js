import React, { Component } from 'react';
import { mdiClipboardAlertOutline as myIcon } from '@mdi/js';
import { Icon } from './';

export default class Alert extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}
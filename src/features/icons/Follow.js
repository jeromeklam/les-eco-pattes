import React, { Component } from 'react';
import { mdiClipboardTextOutline as myIcon } from '@mdi/js';
import { Icon } from './';

export default class Follow extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

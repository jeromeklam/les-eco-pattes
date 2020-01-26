import React, { Component } from 'react';
import { mdiClipboardTextOutline } from '@mdi/js';
import { Icon } from './';

export default class Other extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiClipboardTextOutline} {...this.props} />;
  }
}

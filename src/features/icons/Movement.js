import React, { Component } from 'react';
import { mdiMapMarkerMultiple as myIcon } from '@mdi/js';
import { Icon } from './';

export default class Movement extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

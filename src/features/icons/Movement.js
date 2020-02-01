import React, { Component } from 'react';
import { mdiMapMarkerDistance as myIcon } from '@mdi/js';
import { Icon } from './';

export default class Movement extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

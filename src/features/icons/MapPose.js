import React, { Component } from 'react';
import { mdiMapMarkerRadius as myIcon } from '@mdi/js';
import { Icon } from './';

export default class ZoomMap extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}
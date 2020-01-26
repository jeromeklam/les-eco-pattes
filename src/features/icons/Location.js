import React, { Component } from 'react';
import { mdiMapMarkerOutline } from '@mdi/js';
import { Icon } from './';

export default class Location extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiMapMarkerOutline} {...this.props} />;
  }
}

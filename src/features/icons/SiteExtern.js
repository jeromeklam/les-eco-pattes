import React, { Component } from 'react';
import { mdiMapMarkerAlert as myIcon } from '@mdi/js';
import { Icon } from './';

export default class SiteExtern extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}
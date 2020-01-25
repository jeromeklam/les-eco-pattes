import React, { Component } from 'react';
import { mdiMapMarkerMultiple } from '@mdi/js';
import { Icon } from './';

export default class Site extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiMapMarkerMultiple} {...this.props} />;
  }
}

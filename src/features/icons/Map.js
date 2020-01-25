import React, { Component } from 'react';
import { mdiMapOutline } from '@mdi/js';
import { Icon } from './';

export default class Map extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiMapOutline} {...this.props} />;
  }
}

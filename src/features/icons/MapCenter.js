import React, { Component } from 'react';
import { mdiCrosshairsGps } from '@mdi/js';
import { Icon } from './';

export default class MapCenter extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiCrosshairsGps} {...this.props} />;
  }
}

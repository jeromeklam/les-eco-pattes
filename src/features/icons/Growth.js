import React, { Component } from 'react';
import { mdiWeightKilogram as myIcon } from '@mdi/js';
import { Icon } from './';

export default class Growth extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

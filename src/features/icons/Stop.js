import React, { Component } from 'react';
import { mdiStopCircle as myIcon } from '@mdi/js';
import { Icon } from './';

export default class Stop extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

import React, { Component } from 'react';
import { mdiEye as myIcon } from '@mdi/js';
import { Icon } from './';

export default class Zoom extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

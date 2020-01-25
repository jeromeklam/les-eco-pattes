import React, { Component } from 'react';
import { mdiEye as myIcon } from '@mdi/js';
import { Icon } from './';

export default class View extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

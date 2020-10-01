import React, { Component } from 'react';
import { mdiAccountCircle as myIcon } from '@mdi/js';
import { Icon } from './';

export default class Token extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

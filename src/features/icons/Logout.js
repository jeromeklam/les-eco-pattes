import React, { Component } from 'react';
import { mdiLogout } from '@mdi/js';
import { Icon } from './';

export default class Logout extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiLogout} {...this.props} />;
  }
}

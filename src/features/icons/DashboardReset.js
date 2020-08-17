import React, { Component } from 'react';
import { mdiMonitorClean as myIcon } from '@mdi/js';
import { Icon } from './';

export default class DashboardReset extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

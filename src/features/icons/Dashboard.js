import React, { Component } from 'react';
import { mdiViewDashboardVariant as myIcon } from '@mdi/js';
import { Icon } from './';

export default class Dashboard extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

import React, { Component } from 'react';
import { mdiAccountSupervisorCircle as myIcon } from '@mdi/js';
import { Icon } from './';

export default class GroupType extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

import React, { Component } from 'react';
import { mdiCalendarAccount as myIcon } from '@mdi/js';
import { Icon } from './';

export default class Agenda extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}
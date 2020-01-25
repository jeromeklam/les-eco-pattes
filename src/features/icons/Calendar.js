import React, { Component } from 'react';
import { mdiCalendar } from '@mdi/js';
import { Icon } from './';

export default class Calendar extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiCalendar} {...this.props} />;
  }
}

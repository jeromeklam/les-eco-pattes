import React, { Component } from 'react';
import { Icon } from './';
import { mdiClockOutline as myIcon } from '@mdi/js';

export default class Wait extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

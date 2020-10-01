import React, { Component } from 'react';
import { mdiClockOutline as myIcon } from '@mdi/js';
import { Icon } from './';

export default class Wait extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

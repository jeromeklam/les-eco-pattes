import React, { Component } from 'react';
import { mdiDelete as myIcon } from '@mdi/js';
import { Icon } from './';

export default class DelOne extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

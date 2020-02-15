import React, { Component } from 'react';
import { mdiCart as myIcon } from '@mdi/js';
import { Icon } from './';

export default class Stock extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

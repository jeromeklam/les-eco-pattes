import React, { Component } from 'react';
import { mdiDatabase } from '@mdi/js';
import { Icon } from './';

export default class Data extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiDatabase} {...this.props} />;
  }
}

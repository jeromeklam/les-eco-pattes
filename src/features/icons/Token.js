import React, { Component } from 'react';
import { Icon } from './';
import { mdiAccountCircle } from '@mdi/js';

export default class Token extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiAccountCircle} {...this.props} />;
  }
}

import React, { Component } from 'react';
import { mdiCancel } from '@mdi/js';
import { Icon } from './';

export default class SimpleCancel extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiCancel} {...this.props} />;
  }
}

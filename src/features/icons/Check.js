import React, { Component } from 'react';
import { Icon } from './';
import { mdiCheck } from '@mdi/js';

export default class Check extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiCheck} {...this.props} />;
  }
}
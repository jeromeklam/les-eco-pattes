import React, { Component } from 'react';
import { mdiHistory as myIcon } from '@mdi/js';
import { Icon } from './';

export default class History extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}
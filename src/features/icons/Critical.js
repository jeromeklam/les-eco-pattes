import React, { Component } from 'react';
import { mdiAlertOctagram as myIcon } from '@mdi/js';
import { Icon } from './';

export default class Critical extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}
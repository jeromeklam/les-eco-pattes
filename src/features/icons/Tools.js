import React, { Component } from 'react';
import { mdiHammerWrench as myIcon } from '@mdi/js';
import { Icon } from './';

export default class Tools extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}
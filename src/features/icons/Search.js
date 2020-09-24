import React, { Component } from 'react';
import { mdiMagnify as myIcon } from '@mdi/js';
import { Icon } from './';

export default class Filter extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

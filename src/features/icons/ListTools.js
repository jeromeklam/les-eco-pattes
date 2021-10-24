import React, { Component } from 'react';
import { mdiFormatListCheckbox as myIcon } from '@mdi/js';
import { Icon } from './';

export default class ListTools extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

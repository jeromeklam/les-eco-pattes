import React, { Component } from 'react';
import { mdiChevronDown as myIcon } from '@mdi/js';
import { Icon } from './';

export default class MenuOpened extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

import React, { Component } from 'react';
import { mdiChevronRight as myIcon } from '@mdi/js';
import { Icon } from './';

export default class MenuClosed extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

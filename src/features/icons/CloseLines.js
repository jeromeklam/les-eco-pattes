import React, { Component } from 'react';
import { mdiChevronDoubleUp as myIcon } from '@mdi/js';
import { Icon } from './';

export default class CloseLines extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}
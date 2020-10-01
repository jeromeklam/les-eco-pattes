import React, { Component } from 'react';
import { mdiChevronDoubleDown as myIcon } from '@mdi/js';
import { Icon } from './';

export default class OpenLines extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

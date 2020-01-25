import React, { Component } from 'react';
import { mdiChevronLeft } from '@mdi/js';
import { Icon } from './';

export default class Previous extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiChevronLeft} {...this.props} />;
  }
}

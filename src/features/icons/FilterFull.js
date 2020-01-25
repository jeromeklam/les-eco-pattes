import React, { Component } from 'react';
import { mdiFilter as myIcon } from '@mdi/js';
import { Icon } from './';

export default class FilterFull extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

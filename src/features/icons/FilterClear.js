import React, { Component } from 'react';
import { mdiFilterRemove } from '@mdi/js';
import { Icon } from './';

export default class FilterClear extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiFilterRemove} {...this.props} />;
  }
}

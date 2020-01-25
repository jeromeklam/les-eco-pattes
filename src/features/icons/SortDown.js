import React, { Component } from 'react';
import { mdiSortDescending } from '@mdi/js';
import { Icon } from './';

export default class SortDown extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiSortDescending} {...this.props} />;
  }
}

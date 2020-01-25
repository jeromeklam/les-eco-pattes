import React, { Component } from 'react';
import { mdiSortAscending } from '@mdi/js';
import { Icon } from './';

export default class SortUp extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiSortAscending} {...this.props} />;
  }
}

import React, { Component } from 'react';
import { mdiPencil } from '@mdi/js';
import { Icon } from './';

export default class GetOne extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiPencil} {...this.props} />;
  }
}

import React, { Component } from 'react';
import { mdiSort } from '@mdi/js';
import { Icon } from './';

export default class Sort extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiSort} {...this.props} />;
  }
}

import React, { Component } from 'react';
import { mdiSelection } from '@mdi/js';
import { Icon } from './';

export default class Area extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiSelection} {...this.props} />;
  }
}

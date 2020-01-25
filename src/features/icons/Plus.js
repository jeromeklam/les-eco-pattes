import React, { Component } from 'react';
import { mdiPlus } from '@mdi/js';
import { Icon } from './';

export default class Plus extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiPlus} {...this.props} />;
  }
}

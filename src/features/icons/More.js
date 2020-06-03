import React, { Component } from 'react';
import { mdiMagnify } from '@mdi/js';
import { Icon } from './';

export default class Plus extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiMagnify} {...this.props} />;
  }
}

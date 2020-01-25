import React, { Component } from 'react';
import { mdiFileCheck } from '@mdi/js';
import { Icon } from './';

export default class Submit extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiFileCheck} {...this.props} />;
  }
}

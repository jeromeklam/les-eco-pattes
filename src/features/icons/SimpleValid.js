import React, { Component } from 'react';
import { mdiCheck } from '@mdi/js';
import { Icon } from './';

export default class SimpleValid extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiCheck} {...this.props} />;
  }
}

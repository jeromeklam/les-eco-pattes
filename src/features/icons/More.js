import React, { Component } from 'react';
import { mdiDotsHorizontal } from '@mdi/js';
import { Icon } from './';

export default class Plus extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiDotsHorizontal} {...this.props} />;
  }
}

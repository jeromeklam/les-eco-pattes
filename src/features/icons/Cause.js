import React, { Component } from 'react';
import { mdiSheep } from '@mdi/js';
import { Icon } from './';

export default class Cause extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiSheep} {...this.props} />;
  }
}

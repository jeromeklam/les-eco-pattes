import React, { Component } from 'react';
import { mdiReload } from '@mdi/js';
import { Icon } from './';

export default class Reload extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiReload} {...this.props} />;
  }
}

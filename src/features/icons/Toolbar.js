import React, { Component } from 'react';
import { mdiTools as myIcon } from '@mdi/js';
import { Icon } from './';

export default class Toolbar extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

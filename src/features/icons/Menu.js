import React, { Component } from 'react';
import { mdiMenu } from '@mdi/js';
import { Icon } from './';

export default class Menu extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiMenu} {...this.props} />;
  }
}

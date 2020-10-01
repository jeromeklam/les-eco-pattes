import React, { Component } from 'react';
import { mdiPlaylistPlus as myIcon } from '@mdi/js';
import { Icon } from './';

export default class AddLine extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

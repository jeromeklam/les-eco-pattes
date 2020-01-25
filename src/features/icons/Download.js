import React, { Component } from 'react';
import { mdiDownload as myIcon } from '@mdi/js';
import { Icon } from './';

export default class Download extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

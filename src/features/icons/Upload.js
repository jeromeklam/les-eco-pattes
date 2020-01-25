import React, { Component } from 'react';
import { mdiCloudUpload as myIcon } from '@mdi/js';
import { Icon } from './';

export default class Upload extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

import React, { Component } from 'react';
import Icon from '@mdi/react';
import { mdiCloudUpload as myIcon } from '@mdi/js';

export default class Upload extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} size={1} {...this.props} />;
  }
}

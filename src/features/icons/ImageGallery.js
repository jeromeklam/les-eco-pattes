import React, { Component } from 'react';
import { mdiFileImage } from '@mdi/js';
import { Icon } from './';

export default class ImageGallery extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiFileImage} {...this.props} />;
  }
}

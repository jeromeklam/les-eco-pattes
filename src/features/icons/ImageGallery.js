import React, { Component } from 'react';
import Icon from '@mdi/react';
import {
  mdiFileImage
} from '@mdi/js';

export default class ImageGallery extends Component {
  static propTypes = {

  };

  render() {
    return (
      <Icon 
        path={mdiFileImage}
        size={1}
        color={this.props.color}
      />
    );
  }
}

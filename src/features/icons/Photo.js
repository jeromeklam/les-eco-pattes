import React, { Component } from 'react';
import { mdiFolderMultipleImage as myIcon } from '@mdi/js';
import { Icon } from './';

export default class Photo extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

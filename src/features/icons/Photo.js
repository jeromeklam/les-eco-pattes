import React, { Component } from 'react';
import Icon from '@mdi/react';
import {
  mdiImageFilter as myIcon
} from '@mdi/js';

export default class Photo extends Component {
  static propTypes = {

  };

  render() {
    return (
      <Icon 
        path={myIcon}
        size={1}
        {...this.props}
      />
    );
  }
}

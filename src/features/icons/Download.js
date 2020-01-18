import React, { Component } from 'react';
import Icon from '@mdi/react';
import {
  mdiDownload as myIcon
} from '@mdi/js';

export default class Download extends Component {
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

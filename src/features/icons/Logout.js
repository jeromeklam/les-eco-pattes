import React, { Component } from 'react';
import Icon from '@mdi/react';
import {
  mdiLogout
} from '@mdi/js';

export default class Logout extends Component {
  static propTypes = {

  };

  render() {
    return (
      <Icon 
        path={mdiLogout}
        size={1}
        {...this.props}
      />
    );
  }
}

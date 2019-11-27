import React, { Component } from 'react';
import Icon from '@mdi/react';
import {
  mdiLogin
} from '@mdi/js';

export default class Login extends Component {
  static propTypes = {

  };

  render() {
    return (
      <Icon 
        path={mdiLogin}
        size={1}
        {...this.props}
      />
    );
  }
}

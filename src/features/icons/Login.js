import React, { Component } from 'react';
import { mdiLogin } from '@mdi/js';
import { Icon } from './';

export default class Login extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiLogin} {...this.props} />;
  }
}

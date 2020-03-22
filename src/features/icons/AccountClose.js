import React, { Component } from 'react';
import { mdiShieldCheck as myIcon } from '@mdi/js';
import { Icon } from './';

export default class AccountClose extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

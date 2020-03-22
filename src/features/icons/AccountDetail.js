import React, { Component } from 'react';
import { mdiShieldAccount as myIcon } from '@mdi/js';
import { Icon } from './';

export default class AccountDetail extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

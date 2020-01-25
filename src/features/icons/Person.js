import React, { Component } from 'react';
import { mdiAccount } from '@mdi/js';
import { Icon } from './';

export default class Person extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiAccount} {...this.props} />;
  }
}

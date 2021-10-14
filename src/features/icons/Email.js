import React, { Component } from 'react';
import { Icon } from './';
import { mdiEmail } from '@mdi/js';

export default class Mail extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiEmail} {...this.props} />;
  }
}
import React, { Component } from 'react';
import { mdiCog as myIcon } from '@mdi/js';
import { Icon } from './';

export default class Settings extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

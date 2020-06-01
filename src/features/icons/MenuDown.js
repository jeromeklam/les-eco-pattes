import React, { Component } from 'react';
import { mdiMenuDown as myIcon } from '@mdi/js';
import { Icon } from './';

export default class MenuDown extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

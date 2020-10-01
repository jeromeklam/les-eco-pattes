import React, { Component } from 'react';
import { mdiCloseCircle as myIcon } from '@mdi/js';
import { Icon } from './';

export default class Close extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

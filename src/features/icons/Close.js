import React, { Component } from 'react';
import { mdiCloseCircle } from '@mdi/js';
import { Icon } from './';

export default class Close extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiCloseCircle} {...this.props} />;
  }
}

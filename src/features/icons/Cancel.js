import React, { Component } from 'react';
import { mdiFileCancel } from '@mdi/js';
import { Icon } from './';

export default class Cancel extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiFileCancel} {...this.props} />;
  }
}

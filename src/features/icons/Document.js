import React, { Component } from 'react';
import { mdiTextBoxMultiple as myIcon } from '@mdi/js';
import { Icon } from './';

export default class Document extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

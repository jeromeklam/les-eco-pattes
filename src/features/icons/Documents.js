import React, { Component } from 'react';
import { mdiTextBoxMultiple } from '@mdi/js';
import { Icon } from './';

export default class Documents extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiTextBoxMultiple} {...this.props} />;
  }
}

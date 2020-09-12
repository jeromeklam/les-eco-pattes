import React, { Component } from 'react';
import { mdiTextBoxMultipleOutline as myIcon } from '@mdi/js';
import { Icon } from './';

export default class Documents extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

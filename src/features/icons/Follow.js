import React, { Component } from 'react';
import { mdiClipboardCheckOutline as myIcon } from '@mdi/js';
import { Icon } from './';

//mdiClipboardListOutline 

export default class Follow extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

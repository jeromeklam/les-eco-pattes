import React, { Component } from 'react';
import { mdiFileDocumentEditOutline as myIcon } from '@mdi/js';
import { Icon } from './';

export default class Contract extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}
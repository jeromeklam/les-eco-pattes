import React, { Component } from 'react';
import { mdiMessageTextOutline as myIcon } from '@mdi/js';
import { Icon } from './';

export default class Comment extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

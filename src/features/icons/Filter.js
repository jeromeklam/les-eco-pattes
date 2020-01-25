import React, { Component } from 'react';
import { mdiFilterOutline as myIcon } from '@mdi/js';
import { Icon } from './';

export default class Filter extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

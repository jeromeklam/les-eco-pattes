import React, { Component } from 'react';
import { mdiFilterMinus as myIcon } from '@mdi/js';
import { Icon } from './';

export default class FilterClear extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

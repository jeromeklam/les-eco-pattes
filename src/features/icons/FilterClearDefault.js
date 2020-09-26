import React, { Component } from 'react';
import { mdiFilterMinusOutline as myIcon } from '@mdi/js';
import { Icon } from './';

export default class FilterClearDefault extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

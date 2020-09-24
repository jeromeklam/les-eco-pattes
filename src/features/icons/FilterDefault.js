import React, { Component } from 'react';
import { mdiFilterPlusOutline as myIcon } from '@mdi/js';
import { Icon } from './';

export default class FilterDefault extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

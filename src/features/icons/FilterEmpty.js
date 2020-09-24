import React, { Component } from 'react';
import { mdiFilterMenuOutline as myIcon } from '@mdi/js';
import { Icon } from './';

export default class FilterEmpty extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

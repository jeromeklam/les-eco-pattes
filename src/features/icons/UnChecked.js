import React, { Component } from 'react';
import { mdiCheckboxBlankOutline as myIcon } from '@mdi/js';
import { Icon } from './';

export default class UnChecked extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

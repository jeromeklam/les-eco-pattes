import React, { Component } from 'react';
import { Icon } from './';
import { mdiCheckboxBlankOutline as myIcon } from '@mdi/js';

export default class UnChecked extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

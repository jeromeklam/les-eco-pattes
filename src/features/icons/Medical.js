import React, { Component } from 'react';
import { mdiMedicalBag as myIcon } from '@mdi/js';
import { Icon } from './';

export default class Medical extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

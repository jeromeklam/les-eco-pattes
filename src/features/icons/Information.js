import React, { Component } from 'react';
import { mdiInformationOutline as myIcon } from '@mdi/js';
import { Icon } from './';

export default class Informatio extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}
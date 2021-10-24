import React, { Component } from 'react';
import { mdiInformationOutline as myIcon } from '@mdi/js';
import { Icon } from './';

export default class Information extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}
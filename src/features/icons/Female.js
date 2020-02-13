import React, { Component } from 'react';
import { mdiGenderFemale as myIcon } from '@mdi/js';
import { Icon } from './';

export default class Male extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

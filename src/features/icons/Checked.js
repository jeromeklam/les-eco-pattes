import React, { Component } from 'react';
import { Icon } from './';
import { mdiCheckboxMarked as myIcon } from '@mdi/js';

export default class Checked extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

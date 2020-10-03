import React, { Component } from 'react';
import { mdiCheckboxMarked as myIcon } from '@mdi/js';
import { Icon } from './';

export default class Checked extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

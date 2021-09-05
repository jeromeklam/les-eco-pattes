import React, { Component } from 'react';
import { mdiHelp as myIcon } from '@mdi/js';
import { Icon } from './';

export default class Help extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

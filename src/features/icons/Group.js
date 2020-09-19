import React, { Component } from 'react';
import { Icon } from './';
import { mdiAccountGroup } from '@mdi/js';

export default class Group extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiAccountGroup} {...this.props} />;
  }
}

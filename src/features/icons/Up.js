import React, { Component } from 'react';
import { mdiChevronUp as myIcon } from '@mdi/js';
import { Icon } from './';

export default class Move extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

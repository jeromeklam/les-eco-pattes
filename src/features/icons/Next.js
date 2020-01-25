import React, { Component } from 'react';
import { mdiChevronRight } from '@mdi/js';
import { Icon } from './';

export default class Next extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiChevronRight} {...this.props} />;
  }
}

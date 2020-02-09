import React, { Component } from 'react';
import { mdiTimelineHelpOutline as myIcon } from '@mdi/js';
import { Icon } from './';

export default class Version extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} {...this.props} />;
  }
}

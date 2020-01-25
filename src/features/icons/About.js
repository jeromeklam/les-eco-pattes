import React, { Component } from 'react';
import { mdiInformationVariant } from '@mdi/js';
import { Icon } from './';

export default class About extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiInformationVariant} {...this.props} />;
  }
}

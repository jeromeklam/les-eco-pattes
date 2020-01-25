import React, { Component } from 'react';
import { mdiHome } from '@mdi/js';
import { Icon } from './';

export default class Home extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiHome} {...this.props} />;
  }
}

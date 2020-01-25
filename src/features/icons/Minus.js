import React, { Component } from 'react';
import { mdiMinus } from '@mdi/js';
import { Icon } from './';

export default class Minus extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiMinus} {...this.props} />;
  }
}

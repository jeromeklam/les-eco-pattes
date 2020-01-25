import React, { Component } from 'react';
import { mdiCursorMove } from '@mdi/js';
import { Icon } from './';

export default class MapMove extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiCursorMove} {...this.props} />;
  }
}

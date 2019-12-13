import React, { Component } from 'react';
import Icon from '@mdi/react';
import {
  mdiSelection
} from '@mdi/js';

export default class Area extends Component {
  static propTypes = { };

  render() {
    return (
      <Icon 
        path={mdiSelection}
        size={1}
        {...this.props}
      />
    );
  }
}
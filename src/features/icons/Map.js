import React, { Component } from 'react';
import Icon from '@mdi/react';
import {
  mdiMapOutline
} from '@mdi/js';

export default class Map extends Component {
  static propTypes = { };

  render() {
    return (
      <Icon 
        path={mdiMapOutline}
        size={1}
        {...this.props}
      />
    );
  }
}
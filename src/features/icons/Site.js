import React, { Component } from 'react';
import Icon from '@mdi/react';
import {
  mdiMapMarkerMultiple
} from '@mdi/js';

export default class Site extends Component {
  static propTypes = {

  };

  render() {
    return (
      <Icon 
        path={mdiMapMarkerMultiple}
        size={1}
        {...this.props}
      />
    );
  }
}

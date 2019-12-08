import React, { Component } from 'react';
import Icon from '@mdi/react';
import {
  mdiCrosshairsGps
} from '@mdi/js';

export default class MapCenter extends Component {
  static propTypes = {

  };

  render() {
    return (
      <Icon 
        path={mdiCrosshairsGps}
        size={1}
        color={this.props.color}
      />
    );
  }
}

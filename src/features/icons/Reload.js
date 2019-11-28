import React, { Component } from 'react';
import Icon from '@mdi/react';
import {
  mdiReload
} from '@mdi/js';

export default class Reload extends Component {
  static propTypes = {

  };

  render() {
    return (
      <Icon 
        path={mdiReload}
        size={1}
        color={this.props.color}
      />
    );
  }
}

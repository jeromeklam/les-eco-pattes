import React, { Component } from 'react';
import Icon from '@mdi/react';
import {
  mdiMagnify
} from '@mdi/js';

export default class Filter extends Component {
  static propTypes = {};

  render() {
    return (
      <Icon 
        path={mdiMagnify}
        size={1}
        color={this.props.color}
      />
    );
  }
}

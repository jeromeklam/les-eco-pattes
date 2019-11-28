import React, { Component } from 'react';
import Icon from '@mdi/react';
import {
  mdiPlus
} from '@mdi/js';

export default class AddOne extends Component {
  static propTypes = {};

  render() {
    return (
      <Icon 
        path={mdiPlus}
        size={1}
        color={this.props.color}
      />
    );
  }
}

import React, { Component } from 'react';
import Icon from '@mdi/react';
import {
  mdiDelete
} from '@mdi/js';

export default class DelOne extends Component {
  static propTypes = {

  };

  render() {
    return (
      <Icon 
        path={mdiDelete}
        size={1}
        color={this.props.color}
      />
    );
  }
}

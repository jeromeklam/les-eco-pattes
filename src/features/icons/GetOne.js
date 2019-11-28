import React, { Component } from 'react';
import Icon from '@mdi/react';
import {
  mdiPencil
} from '@mdi/js';

export default class GetOne extends Component {
  static propTypes = {

  };

  render() {
    return (
      <Icon 
        path={mdiPencil}
        size={1}
        color={this.props.color}
      />
    );
  }
}

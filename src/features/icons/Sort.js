import React, { Component } from 'react';
import Icon from '@mdi/react';
import {
  mdiSort
} from '@mdi/js';

export default class Sort extends Component {
  static propTypes = {

  };

  render() {
    return (
      <Icon 
        path={mdiSort}
        size={1}
        color={this.props.color}
        className={this.props.className || ''}
      />
    );
  }
}

import React, { Component } from 'react';
import Icon from '@mdi/react';
import {
  mdiSortAscending
} from '@mdi/js';

export default class SortUp extends Component {
  static propTypes = {

  };

  render() {
    return (
      <Icon 
        path={mdiSortAscending}
        size={1}
        color={this.props.color}
        className={this.props.className || ''}
      />
    );
  }
}

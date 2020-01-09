import React, { Component } from 'react';
import Icon from '@mdi/react';
import {
  mdiSortDescending
} from '@mdi/js';

export default class SortDown extends Component {
  static propTypes = {

  };

  render() {
    return (
      <Icon 
        path={mdiSortDescending}
        size={1}
        color={this.props.color}
        className={this.props.className || ''}
      />
    );
  }
}

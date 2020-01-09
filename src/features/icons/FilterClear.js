import React, { Component } from 'react';
import Icon from '@mdi/react';
import {
  mdiFilterRemove
} from '@mdi/js';

export default class FilterClear extends Component {
  static propTypes = {

  };

  render() {
    return (
      <Icon 
        path={mdiFilterRemove}
        size={1}
        color={this.props.color}
      />
    );
  }
}

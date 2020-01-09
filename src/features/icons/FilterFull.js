import React, { Component } from 'react';
import Icon from '@mdi/react';
import {
  mdiFilter
} from '@mdi/js';

export default class FilterFull extends Component {
  static propTypes = {

  };

  render() {
    return (
      <Icon 
        path={mdiFilter}
        size={1}
        color={this.props.color}
      />
    );
  }
}

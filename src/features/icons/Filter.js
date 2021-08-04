import React, { Component } from 'react';
import Icon from '@mdi/react';
import {
  mdiFilterOutline
} from '@mdi/js';

export default class Filter extends Component {
  static propTypes = {

  };

  render() {
    return (
      <Icon 
        path={mdiFilterOutline}
        size={1}
        color={this.props.color}
      />
    );
  }
}

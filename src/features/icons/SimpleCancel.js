import React, { Component } from 'react';
import Icon from '@mdi/react';
import {
  mdiCancel
} from '@mdi/js';

export default class SimpleCancel extends Component {
  static propTypes = {

  };

  render() {
    return (
      <Icon 
        path={mdiCancel}
        size={1}
        color={this.props.color}
      />
    );
  }
}

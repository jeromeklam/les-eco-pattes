import React, { Component } from 'react';
import Icon from '@mdi/react';
import {
  mdiCheck
} from '@mdi/js';

export default class SimpleValid extends Component {
  static propTypes = {

  };

  render() {
    return (
      <Icon 
        path={mdiCheck}
        size={1}
        color={this.props.color}
      />
    );
  }
}

import React, { Component } from 'react';
import Icon from '@mdi/react';
import {
  mdiMinus
} from '@mdi/js';

export default class Minus extends Component {
  static propTypes = {

  };

  render() {
    return (
      <Icon 
        path={mdiMinus}
        size={1}
        color={this.props.color}
      />
    );
  }
}

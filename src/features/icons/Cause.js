import React, { Component } from 'react';
import Icon from '@mdi/react';
import {
  mdiSheep
} from '@mdi/js';

export default class Cause extends Component {
  static propTypes = {

  };

  render() {
    return (
      <Icon 
        path={mdiSheep}
        size={1}
        {...this.props}
      />
    );
  }
}

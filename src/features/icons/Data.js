import React, { Component } from 'react';
import Icon from '@mdi/react';
import {
  mdiDatabase
} from '@mdi/js';

export default class Data extends Component {
  static propTypes = {

  };

  render() {
    return (
      <Icon 
        path={mdiDatabase}
        size={1}
        {...this.props}
      />
    );
  }
}

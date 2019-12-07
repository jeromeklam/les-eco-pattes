import React, { Component } from 'react';
import Icon from '@mdi/react';
import {
  mdiAccount
} from '@mdi/js';

export default class Person extends Component {
  static propTypes = {};

  render() {
    return (
      <Icon 
        path={mdiAccount}
        size={1}
        {...this.props}
      />
    );
  }
}
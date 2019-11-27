import React, { Component } from 'react';
import Icon from '@mdi/react';
import {
  mdiAccount
} from '@mdi/js';

export default class Account extends Component {
  static propTypes = {

  };

  render() {
    return (
      <Icon
        path={mdiAccount}
        size={1}
        color={this.props.color}
      />
    );
  }
}

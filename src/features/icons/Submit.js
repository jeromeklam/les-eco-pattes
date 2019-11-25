import React, { Component } from 'react';
import Icon from '@mdi/react';
import {
  mdiFileCheck
} from '@mdi/js';

export default class Submit extends Component {
  static propTypes = {

  };

  render() {
    return (
      <Icon
        path={mdiFileCheck}
        size={1}
        color={this.props.color}
      />
    );
  }
}

import React, { Component } from 'react';
import Icon from '@mdi/react';
import {
  mdiFileCancel
} from '@mdi/js';

export default class Cancel extends Component {
  static propTypes = {

  };

  render() {
    return (
      <Icon
        path={mdiFileCancel}
        size={1}
        color={this.props.color}
      />
    );
  }
}

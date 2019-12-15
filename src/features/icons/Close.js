import React, { Component } from 'react';
import Icon from '@mdi/react';
import {
  mdiCloseCircle
} from '@mdi/js';

export default class Close extends Component {
  static propTypes = {

  };

  render() {
    return (
      <Icon
        path={mdiCloseCircle}
        size={1}
        color={this.props.color}
      />
    );
  }
}

import React, { Component } from 'react';
import Icon from '@mdi/react';
import {
  mdiCursorMove
} from '@mdi/js';

export default class MapMove extends Component {
  static propTypes = {

  };

  render() {
    return (
      <Icon 
        path={mdiCursorMove}
        size={1}
        color={this.props.color}
      />
    );
  }
}

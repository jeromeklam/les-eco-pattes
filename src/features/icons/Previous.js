import React, { Component } from 'react';
import Icon from '@mdi/react';
import {
  mdiChevronLeft
} from '@mdi/js';

export default class Previous extends Component {
  static propTypes = {

  };

  render() {
    return (
      <Icon 
        path={mdiChevronLeft}
        size={1}
        color={this.props.color}
      />
    );
  }
}

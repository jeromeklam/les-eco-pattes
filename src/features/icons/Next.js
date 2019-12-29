import React, { Component } from 'react';
import Icon from '@mdi/react';
import {
  mdiChevronRight
} from '@mdi/js';

export default class Next extends Component {
  static propTypes = {

  };

  render() {
    return (
      <Icon 
        path={mdiChevronRight}
        size={1}
        color={this.props.color}
      />
    );
  }
}

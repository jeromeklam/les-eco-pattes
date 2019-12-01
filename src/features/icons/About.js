import React, { Component } from 'react';
import Icon from '@mdi/react';
import {
  mdiInformationVariant
} from '@mdi/js';

export default class About extends Component {
  static propTypes = {

  };

  render() {
    return (
      <Icon
        path={mdiInformationVariant}
        size={1}
        color={this.props.color}
      />
    );
  }
}

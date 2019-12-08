import React, { Component } from 'react';
import Icon from '@mdi/react';
import {
  mdiFileDocumentBox
} from '@mdi/js';

export default class Documents extends Component {
  static propTypes = {

  };

  render() {
    return (
      <Icon 
        path={mdiFileDocumentBox}
        size={1}
        color={this.props.color}
      />
    );
  }
}

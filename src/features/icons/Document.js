import React, { Component } from 'react';
import Icon from '@mdi/react';
import {
  mdiFileDocumentBoxMultipleOutline as myIcon
} from '@mdi/js';

export default class Document extends Component {
  static propTypes = {

  };

  render() {
    return (
      <Icon 
        path={myIcon}
        size={1}
        {...this.props}
      />
    );
  }
}

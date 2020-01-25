import React, { Component } from 'react';
import { mdiFileDocumentBox } from '@mdi/js';
import { Icon } from './';

export default class Documents extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiFileDocumentBox} {...this.props} />;
  }
}

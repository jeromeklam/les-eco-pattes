import React, { Component } from 'react';
import { Icon as ReactIcon } from '@mdi/react';

export default class Icon extends Component {
  render() {
    const size = this.props.size || 'md';
    let realSize = 1;
    switch (size) {
      case 'sm': {
        realSize = 0.7;
        break;
      }
      case 'md': {
        realSize = 0.9;
        break;
      }
      default: {
        realSize = size;
        break;
      }
    }
    return <ReactIcon {...this.props} size={realSize} />;
  }
}

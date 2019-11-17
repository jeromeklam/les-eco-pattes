import React, { Component } from 'react';
import Icon from '@mdi/react';
import {
  mdiHome
} from '@mdi/js';

export default class Home extends Component {
  static propTypes = {

  };

  render() {
    return (
      <Icon 
        path={mdiHome}
        size={1}
      />
    );
  }
}

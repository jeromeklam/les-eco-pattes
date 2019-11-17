import React, { Component } from 'react';
import Icon from '@mdi/react';
import {
  mdiMenu
} from '@mdi/js';

export default class Menu extends Component {
  static propTypes = {

  };

  render() {
    return (
      <Icon 
        path={mdiMenu}
        size={1}
      />
    );
  }
}

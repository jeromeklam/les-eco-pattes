import React, { Component } from 'react';
import Icon from '@mdi/react';
import {
  mdiCalendar
} from '@mdi/js';

export default class Calendar extends Component {
  static propTypes = {

  };

  render() {
    return (
      <Icon
        path={mdiCalendar}
        size={1}
        color={this.props.color}
      />
    );
  }
}

import React, { Component } from 'react';
import { mdiTournament as myIcon } from '@mdi/js';
import { Icon } from './';

export default class Descendant extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} rotate={270} {...this.props} />;
  }
}

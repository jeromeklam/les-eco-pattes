import React, { Component } from 'react';
import Icon from '@mdi/react';
import { mdiFilterOutline as myIcon } from '@mdi/js';

export default class Filter extends Component {
  static propTypes = {};

  render() {
    return <Icon path={myIcon} size={1} {...this.props} />;
  }
}

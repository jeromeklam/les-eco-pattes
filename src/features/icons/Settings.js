import React, { Component } from 'react';
import { mdiSettingsOutline } from '@mdi/js';
import { Icon } from './';

export default class Settings extends Component {
  static propTypes = {};

  render() {
    return <Icon path={mdiSettingsOutline} {...this.props} />;
  }
}

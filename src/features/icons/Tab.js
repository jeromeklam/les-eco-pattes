import React, { Component } from 'react';
import Icon from '@mdi/react';
import { mdiMapMarkerOutline, mdiSettingsOutline, mdiClipboardTextOutline, mdiSheep } from '@mdi/js';

export default class AddOne extends Component {
  static propTypes = {};

  render() {
    let path = '';
    switch (this.props.name) {
      case 'cause':
        path = mdiSheep;
        break;
      case 'location':
        path = mdiMapMarkerOutline;
        break;
      case 'settings':
        path = mdiSettingsOutline;
        break;
      case 'misc':
        path = mdiClipboardTextOutline;
        break;
      case 'move':
        path = mdiClipboardTextOutline;
        break;
      default:
        path = this.props.name;
        break;
    }
    return <Icon className="icons-tab" path={path} size={1} color={this.props.color || 'green'} />;
  }
}

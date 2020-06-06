import React, { Component } from 'react';
import Icon from '@mdi/react';
import { 
  mdiSheep,
  mdiSwapHorizontal,
  mdiMapMarkerOutline, 
  mdiCogOutline, 
  mdiClipboardTextOutline,
  mdiFilter,
  mdiDelete,
  mdiCloseCircle
} from '@mdi/js';

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
        path = mdiCogOutline;
        break;
      case 'misc':
        path = mdiClipboardTextOutline;
        break;
      case 'move':
        path = mdiSwapHorizontal;
        break;
      case 'filter' :
        path = mdiFilter;
        break;
      case 'delete' :
        path = mdiDelete;
        break;
      case 'close' :
        path = mdiCloseCircle;
        break;
      default:
        path = this.props.name;
        break;
    }
    return <Icon className="icons-tab" path={path} size={1} color={this.props.color || 'green'} />;
  }
}

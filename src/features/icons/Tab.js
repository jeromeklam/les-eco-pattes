import React, { Component } from 'react';
import Icon from '@mdi/react';
import {
  mdiMapMarkerOutline,
  mdiSettingsOutline,
  mdiClipboardTextOutline
} from '@mdi/js';

export default class AddOne extends Component {
  static propTypes = {};

  render() {    
    let path = "" ;
    switch (this.props.name) {
      case "location":
        path=mdiMapMarkerOutline;
        break;
      case "settings":
        path=mdiSettingsOutline;
        break;
      case "misc":
        path=mdiClipboardTextOutline;
        break;
    };
    return (
      <Icon className="icons-tab"
        path={path}
        size={1}
        color="green"
      />
    );
  }
}
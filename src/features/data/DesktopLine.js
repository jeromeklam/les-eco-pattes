import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DesktopListLine } from '../common';
import { dataTypes } from './functions';

export default class DesktopLine extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  render() {
    const item = this.props.item;
    const cols = [
      { size:"20", name: "name", content: item.data_name },
      { size:"10", name: "type", content: item.data_type, type: "switch", values: dataTypes() }
    ];
    return (
      <DesktopListLine
        id={item.id}
        onGetOne={this.props.onGetOne}
        cols={cols}
      />
    );
  }
}

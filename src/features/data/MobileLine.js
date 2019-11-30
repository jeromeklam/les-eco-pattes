import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MobileListLine } from '../common';
import { dataTypes } from './functions';

export default class MobileLine extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    onGetOne: PropTypes.func.isRequired,
  };

  render() {
    const item = this.props.item;
    const lines = [
      { name: "Nom", content: item.data_name },
      { name: "Type", content: item.data_type, type: "switch", values: dataTypes() },
    ];
    return (
      <MobileListLine
        id={item.id}
        title={item.data_name}
        onGetOne={this.props.onGetOne}
        lines={lines}
      />
    );
  }
}

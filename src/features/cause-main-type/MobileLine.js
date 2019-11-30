import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MobileListLine } from '../common';

export default class MobileLine extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    onGetOne: PropTypes.func.isRequired,
  };

  render() {
    const item = this.props.item;
    const lines = [
      { name: "Nom", content: item.camt_name }
    ];
    return (
      <MobileListLine
        id={item.id}
        title={item.camt_name}
        onGetOne={this.props.onGetOne}
        lines={lines}
      />
    );
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DesktopListLine } from '../common';

export default class DesktopLine extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    onGetOne: PropTypes.func.isRequired,
  };

  render() {
    const item = this.props.item;
    const cols = [
      { size:"30", name: "name", content: item.camt_name }
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

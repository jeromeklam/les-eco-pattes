import React, { Component } from 'react';
import AddOneIcon from '../icons/AddOne';

export default class ButtonAddOne extends Component {
  static propTypes = {};

  render() {
    return (
      <button title="Ajouter" type="button" className="btn btn-primary" onClick={this.props.onClick}>
        <AddOneIcon color={this.props.color} />
      </button>
    );
  }
}

import React, { Component } from 'react';
import GetOneIcon from '../icons/GetOne';

export default class ButtonGetOne extends Component {
  static propTypes = {

  };

  render() {
    return (
      <button type="button" className="btn btn-secondary" onClick={this.props.onClick}>
        <GetOneIcon color={this.props.color} />
      </button>
    );
  }
}

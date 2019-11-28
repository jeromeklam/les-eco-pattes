import React, { Component } from 'react';
import DelOneIcon from '../icons/DelOne';

export default class ButtonDelOne extends Component {
  static propTypes = {

  };

  render() {
    return (
      <button type="button" className="btn btn-danger" onClick={this.props.onClick}>
        <DelOneIcon color={this.props.color} />
      </button>
    );
  }
}

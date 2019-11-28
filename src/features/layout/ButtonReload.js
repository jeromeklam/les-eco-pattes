import React, { Component } from 'react';
import ReloadIcon from '../icons/Reload';

export default class ButtonReload extends Component {
  static propTypes = {};

  render() {
    return (
      <button type="button" className="btn btn-secondary" onClick={this.props.onClick}>
        <ReloadIcon color={this.props.color} />
      </button>
    );
  }
}

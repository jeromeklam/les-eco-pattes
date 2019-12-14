import React, { Component } from 'react';

export default class ButtonTab extends Component {
  static propTypes = {};

  render() {
    return (
      <button type="button" className="btn btn-primary" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

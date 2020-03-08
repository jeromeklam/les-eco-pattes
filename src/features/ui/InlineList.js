import React, { Component } from 'react';

export default class InlineList extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="inline-list">
        {this.props.children}
      </div>
    );
  }
}

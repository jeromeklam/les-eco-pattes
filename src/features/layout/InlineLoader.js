import React, { Component } from 'react';

export default class InlineLoader extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="gooey">
        <span className="dot"></span>
        <div className="dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }
}

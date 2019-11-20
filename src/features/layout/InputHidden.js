import React, { Component } from 'react';
import classnames from 'classnames';

export default class InputHidden extends Component {
  static propTypes = {};

  render() {
    let props = this.props;
    return (
      <div>
        <input
          type="hidden"
          value={this.props.value}
          {...props}
        />
      </div>
    );
  }
}

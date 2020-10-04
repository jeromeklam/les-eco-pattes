import React, { Component } from 'react';
import classnames from 'classnames';

export default class Col extends Component {
  static propTypes = {};

  render() {
    let add = "";
    if (this.props.layoutSize && this.props[this.props.layoutSize]) {
      add = `-${this.props[this.props.layoutSize]}`;
    } else {
      if (this.props['col']) {
        add = `-${this.props['col']}`;
      }
    }
    return (
      <div className={classnames("col" + add)}>
        {this.props.children}
      </div>
    );
  }
}

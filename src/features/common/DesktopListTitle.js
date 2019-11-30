import React, { Component } from 'react';
import classnames from 'classnames';

export default class DesktopListTitle extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="row">
        {this.props.cols.map(oneCol => {
          return (
            <div key={oneCol.name} className={classnames('col-' + oneCol.size)}>
              <span>{oneCol.label}</span>
            </div>
          )
        })}
      </div>
    )
  }
}
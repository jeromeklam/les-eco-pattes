import React, { Component } from 'react';

export default class MobileListLineCol extends Component {
  static propTypes = {};

  render() {
    let content = this.props.content;
    if (this.props.type && this.props.values) {
      switch (this.props.type) {
        case 'switch':
          const pos = this.props.values.find(element => element.value == this.props.content);
          if (pos) {
            content = pos.label;
          }
          break;
      }
    }
    return (
      <div
        onClick={() => {
          this.props.onGetOne(this.props.id);
        }}
      >
        <span>{content}</span>
      </div>
    );
  }
}

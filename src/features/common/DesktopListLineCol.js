import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class DesktopListLineCol extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    onGetOne: PropTypes.func.isRequired,
  };

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
        default:
          break;
      }
    }
    return (
      <div
        className={classnames('col-' + this.props.size, 'col-vertical-align')}
        onClick={() => {
          this.props.onGetOne(this.props.id);
        }}
      >
        <span>{content}</span>
      </div>
    );
  }
}

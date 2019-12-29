import React, { Component } from 'react';
import classnames from 'classnames';
import PreviousIcon from '../icons/Previous';

export default class ButtonPrevious extends Component {
  static propTypes = {};

  render() {
    return (
      <button title="Précedent" 
        type="button" 
        className={classnames("btn",this.props.className)} 
        onClick={this.props.onClick}
      >
        <PreviousIcon color={this.props.color} />
      </button>
    );
  }
}

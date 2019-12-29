import React, { Component } from 'react';
import classnames from 'classnames';
import NextIcon from '../icons/Next';

export default class ButtonNext extends Component {
  static propTypes = {};

  render() {
    return (
      <button title="Suivant" 
        type="button" 
        className={classnames("btn",this.props.className)} 
        onClick={this.props.onClick}
      >
        <NextIcon color={this.props.color} />
      </button>
    );
  }
}

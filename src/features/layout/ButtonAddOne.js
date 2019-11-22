import React, { Component } from 'react';
import AddOneIcon from '../icons/AddOne';

export default class ButtonAddOne extends Component {
  static propTypes = {

  };

  render() {
    return (
      <button 
        type="button"         
        className="btn btn-primary"                
        onClick={this.props.onClick} 
      >
        <AddOneIcon />
      </button>
    );
  }
}

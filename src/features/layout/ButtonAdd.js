import React, { Component } from 'react';

export default class ButtonAdd extends Component {
  static propTypes = {

  };

  render() {
    return (
      <button 
        type="button"         
        className="btn btn-primary"                
        onClick={this.props.onClick} 
      >
      +
      </button>
    );
  }
}

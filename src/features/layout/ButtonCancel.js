import React, { Component } from 'react';

export default class ButtonCancel extends Component {
  static propTypes = {

  };

  render() {
    return (
      <button 
        type="button"         
        className="btn btn-dark"                
        onClick={this.props.onClick} 
      >
        Annuler
      </button>
    );
  }
}

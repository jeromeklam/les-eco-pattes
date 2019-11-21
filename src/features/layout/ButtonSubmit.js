import React, { Component } from 'react';

export default class ButtonSubmit extends Component {
  static propTypes = {

  };

  render() {
    return (
      <button 
        type="button"         
        className="btn btn-success btn-submit"                
        onClick={this.props.onClick} 
      >
        Enregistrer
      </button>
    );
  }
}

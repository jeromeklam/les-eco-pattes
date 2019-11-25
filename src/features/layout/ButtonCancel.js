import React, { Component } from 'react';
import CancelIcon from '../icons/Cancel';

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
        { this.props.icon &&
          <CancelIcon color="white"/>
        }
        { this.props.label && 
         <span>Annuler</span>
        }
      </button>
    );
  }
}

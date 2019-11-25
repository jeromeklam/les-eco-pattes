import React, { Component } from 'react';
import SubmitIcon from '../icons/Submit';

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
        { this.props.icon &&
          <SubmitIcon color="white"/>
        }
        { this.props.label && 
         <span>Enregistrer</span>
        }
      </button>
    );
  }
}

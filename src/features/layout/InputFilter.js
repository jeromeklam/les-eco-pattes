import React, { Component } from 'react';
import FilterIcon from '../icons/Filter';

export default class InputFilter extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="input-group input-filter">
        <input type="text" className="form-control">
        </input>
        <div className="input-group-append">
          <button 
            type="button" 
            className="btn" 
            onClick={this.props.onClick} 
          >
            <FilterIcon color="white"/>
          </button>
        </div>
      </div>
    );
  }
}

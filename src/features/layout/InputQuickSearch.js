import React, { Component } from 'react';
import { Desktop, Tablet, Mobile, Default } from '../common'
import SearchIcon from '../icons/Search';

export default class InputQuickSearch extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="input-group input-quick_search">
        <Desktop>
          <input 
            type="text" 
            className="form-control" 
            name={this.props.name}
            value={this.props.quickSearch}
            onChange={this.props.onChange}
          />            
        </Desktop>
        {this.props.mobileQuickSearch &&
          <Mobile>          
            <input 
              type="text" 
              className="form-control"
              name={this.props.name}
              value={this.props.quickSearch}
              onChange={this.props.onChange}
            />              
          </Mobile>
        }
        <div className="input-group-append">
          <button 
            type="button" 
            className="btn" 
            onClick={this.props.onClick} 
          >
            <SearchIcon color="white"/>
          </button>
        </div>
      </div>
    );
  }
}

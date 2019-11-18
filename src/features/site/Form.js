import React, { Component } from 'react';

export default class Form extends Component {
  static propTypes = {

  };

  constructor(props) {
    super(props);
    this.state = {
      site : props.site
    }
  }

  render() {
    return (
      <div className="site-form">      
        <div class="card">
          <div class="card-body">
            {this.state.site.site_name}                        
          </div>
        </div>
      </div>
    );
  }
}

import React, { Component } from 'react';

export default class Form extends Component {
  static propTypes = {

  };

  constructor(props) {
    super(props);
    this.state = {
      siteType : props.siteType
    }
  }

  render() {
    return (
      <div className="site-type-form">
        <div class="card">
          <div class="card-body">
            {this.state.siteType.sitt_name}                                    
          </div>
        </div>
      </div>
    );
  }
}

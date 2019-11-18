import React, { Component } from 'react';

export default class Form extends Component {
  static propTypes = {

  };

  constructor(props) {
    super(props);
    this.state = {
      cause : props.cause
    }
  }

  render() {
    return (
      <div className="cause-form">      
        <div class="card">
          <div class="card-body">
            {this.state.cause.cau_name}                        
          </div>
        </div>
      </div>
    );
  }
}

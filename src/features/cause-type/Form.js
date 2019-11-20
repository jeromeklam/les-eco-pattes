import React, { Component } from 'react';

export default class Form extends Component {
  static propTypes = {

  };

  constructor(props) {
    super(props);
    this.state = {
      causeType : props.causeType
    }
  }

  render() {
    return (
      <div className="cause-type-form">
        <div class="card">
          <div class="card-body">
            {this.state.causeType.caut_name}                        
          </div>
        </div>
      </div>
    );
  }
}

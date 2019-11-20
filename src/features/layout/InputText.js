import React, { Component } from 'react';
import classnames from 'classnames';

export default class InputText extends Component {
  static propTypes = {};

  render() {
    let props = this.props;
    return (
      <div className="form-group row">
        <label forname={this.props.id} className="col-sm-6 col-form-label">{this.props.label}</label>
        <div className="col-sm-30">
          <input
            type="text"
            id={this.props.id}
            value={this.props.value}
            className="form-control-plaintext" 
            {...props}
          />
        </div>
      </div>
    );
  }
}

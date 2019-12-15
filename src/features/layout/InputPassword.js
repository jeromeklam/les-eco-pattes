import React, { Component } from 'react';
import classnames from 'classnames';

export default class InputPassword extends Component {
  static propTypes = {};

  render() {
    let value = '';
    if (this.props.value && this.props.value !== null) {
      value = this.props.value;
    }
    let id = this.props.name;
    if (this.props.id && this.props.id !== null) {
      id = this.props.id;
    }
    let props = {
      ...this.props,
      value: value,
      id: id
    };
    let clsLabel = '';
    let clsInput = '';
    if (this.props.size) {
      if (this.props.size.desktop) {
        clsLabel = 'col-md-' + this.props.size.desktop[0];
        clsInput = 'col-md-' + this.props.size.desktop[1];
      }
    } else {
      clsLabel = 'col-md-6';
      clsInput = 'col-md-30';
    }
    return (
      <div className="form-group row">
        <label htmlFor={this.props.id} className={classnames(clsLabel, "col-form-label")}>
          {this.props.label}
          {this.props.required && 
           <span>&nbsp;*</span>
          }
        </label>
        <div className={classnames(clsInput)}>
          <input
            type="password"
            id={props.id}
            className="form-control" 
            {...props}
          />
        </div>
      </div>
    );
  }
}

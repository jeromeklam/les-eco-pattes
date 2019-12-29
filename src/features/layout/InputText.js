import React, { Component } from 'react';
import classnames from 'classnames';

export default class InputText extends Component {
  static propTypes = {};

  render() {
    let value = '';
    if (this.props.value && this.props.value !== null) {
      value = this.props.value;
    }
    let singleLine = "row";
    let colLabel = "col-sm-6";
    let colText = "col-sm-30"
    if (this.props.labtop && this.props.labtop !== null) {
      singleLine = "";
      colLabel = ""
      colText = ""
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
    return (
      <div className={classnames("form-group",singleLine)}>
        <label htmlFor={this.props.id} className={classnames(colLabel,"col-form-label")}>
          {this.props.label}
          {this.props.required && 
          <span>&nbsp;*</span>
          }
        </label>
        <div className={classnames(colText)}>
          <input
            type="text"
            id={props.id}
            className="form-control" 
            {...props}
          />
        </div>
      </div>
    );
  }
}

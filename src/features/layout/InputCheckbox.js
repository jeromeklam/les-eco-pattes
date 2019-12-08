import React, { Component } from 'react';

export default class InputCheckbox extends Component {
  static propTypes = {};

  render() {
    let id = this.props.name;
    if (this.props.id && this.props.id !== null) {
      id = this.props.id;
    }
    let props = {
      ...this.props,
      id: id,
    };
    return (
      <div className="form-group row">
        <div className="col-sm-6 col-form-label">{this.props.label}</div>
        <div className="col-sm-30">
          <div className="">
            <label className="form-check-label" htmlFor={this.props.id}>
              {this.props.text}
            </label>
            <label className="switch">
              <input type="checkbox" class="form-check-input primary" id={props.id} {...props} />
              <span class="slider round"></span>
            </label>
          </div>
        </div>
      </div>
    );
  }
}

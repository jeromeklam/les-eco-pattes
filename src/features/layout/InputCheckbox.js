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
        <div className="col-sm-30 text-left">
          <div className="">
            <label className="form-check-label" htmlFor={this.props.id}>
              {this.props.text}
            </label>
            <label className="switch">
              <input
                type="checkbox"
                className="form-check-input primary"
                id={props.id}
                {...props}
              />
              <span className="slider round"></span>
            </label>
            {this.props.detail && <span className="slider-detail">{this.props.detail}</span>}
          </div>
        </div>
      </div>
    );
  }
}

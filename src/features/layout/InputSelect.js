import React, { Component } from 'react';

export default class InputSelect extends Component {
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
    let options = this.props.options;
    let empty = this.props.addempty;
    let props = {
      ...this.props,
      options: null,
      addempty: null,
      value: value,
      id: id,
    };
    return (
      <div className="form-group row">
        <label forname={this.props.id} className="col-sm-6 col-form-label">
          {this.props.label}
        </label>
        <div className="col-sm-30">
          <select type="text" id={props.id} className="form-control" {...props}>
            {empty &&
              <option key="" value="">
                Aucune sélection
              </option>
            }
            {options.map(oneOption => {
              return (
                <option key={oneOption.value} value={oneOption.value}>
                  {oneOption.label}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );
  }
}

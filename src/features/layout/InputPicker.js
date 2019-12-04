import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { More } from '../icons';

export default class InputPicker extends Component {
  static propTypes = {};

   constructor(props) {
    super(props);
    this.state = {
      search: false,
    }; 
    this.onMore = this.onMore.bind(this);
  }

  onMore() {
    this.setState({ search: true });
  }

  render() {
    console.log("search inputPicker",this.state.search);

    return (
      <div className="form-group row">
        <label htmlFor={this.props.id} className="col-sm-6 col-form-label">
          {this.props.label}
        </label>
        <div className="col-sm-30">
          <div className="row">
            <div className="col-36 input-group">
              <input
                type="text"
                name={'field-@'}
                value={this.props.value}
                className="form-control"
                onChange={this.onChange}
              />
              <div className="input-group-append">
                <button type="button" className="btn btn-outline-success" onClick={this.onMore}>
                  <More color="green" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

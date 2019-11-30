import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {AddOne, DelOne} from '../icons';

export default class InputStringArray extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  };

  render() {
    const items = JSON.parse(this.props.value);
    console.log(items);
    return (
      <div className="form-group row">
        <label htmlFor={this.props.id} className="col-sm-6 col-form-label">
          {this.props.label}
        </label>
        <div className="col-sm-30">
          {items.length && (
            <div>
              {items.map((oneItem, idx) => {
                return (
                  <div className="row" key={idx}>
                    <div className="col-36 input-group">
                      <input type="text" value={oneItem} className="form-control" />
                      <div className="input-group-append">
                        <div className="input-group-text"><DelOne /></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="row">
            <div className="col-36 input-group">
              <input type="text" value="" className="form-control" />
              <div className="input-group-append">
                <div className="input-group-text"><AddOne /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

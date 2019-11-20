import React, { Component } from 'react';
import classnames from 'classnames';

export default class InputPasswordUpDown extends Component {
  static propTypes = {};

  render() {
    let props = this.props;
    return (
      <div>
        <label for={this.props.id} className="sr-only">
          {this.props.label}
        </label>
        <input
          type="password"
          className={classnames('form-control', this.props.error && 'is-invalid')}
          value={this.props.value}
          onChange={this.props.onChange}
          placeholder={this.props.label}
          {...props}
        />
        {this.props.error && (
          <div className="">
            <small id={this.props.name + 'Help'} className="text-danger">
              {this.props.error}
            </small>
          </div>
        )}
      </div>
    );
  }
}

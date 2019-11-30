import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MobileListLineCol } from './';

export default class MobileListLine extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    lines: PropTypes.array.isRequired,
  };

  render() {
    const item = this.props.item;
    return (
      <div className="row">
        <div className="col-36">
          <div className="card">
            <div
              className="card-heading"
              onClick={() => {
                this.props.onGetOne(this.props.id);
              }}
            >
              <span>{this.props.title}</span>
            </div>
            <div className="card-body">
              {this.props.lines.map(oneLine => {
                const line = { ...oneLine, id: this.props.id };
                return (
                  <MobileListLineCol key={line.name} {...line} onGetOne={this.props.onGetOne} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

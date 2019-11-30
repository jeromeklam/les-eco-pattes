import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MobileListLineCol } from './';
import classnames from 'classnames';

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
              <div className="row">
              {this.props.lines.map(oneLine => {
                const line = { ...oneLine, id: this.props.id };
                const content = item[oneLine.col];
                return (
                  <div  className={classnames('col-' + line.mob_size)}>
                  {!oneLine.title &&
                    <MobileListLineCol
                      key={line.name}
                      content={content}
                      {...line}
                      onGetOne={this.props.onGetOne}
                    />
                  }
                  </div>
                );
              })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

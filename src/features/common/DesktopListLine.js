import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { HoverObserver, ButtonGetOne, ButtonDelOne } from '../layout';
import { DesktopListLineCol } from './';
import { getObjectmemberValue } from '../../common';

export default class DesktopListLine extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    onGetOne: PropTypes.func.isRequired,
    cols: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      flipped: false,
    };
    this.mouseLeave = this.mouseLeave.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
  }

  mouseLeave(event) {
    this.setState({ flipped: false });
  }

  mouseEnter(event) {
    this.setState({ flipped: true });
  }

  render() {
    const item = this.props.item;
    return (
      <HoverObserver onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
        <div className="row">
          {this.props.cols.map(oneCol => {
            const line = { ...oneCol, id: this.props.id };
            const content = getObjectmemberValue(item, oneCol.col);
            return (
              <DesktopListLineCol
                key={line.name}
                content={content}
                {...line}
                onGetOne={this.props.onGetOne}
              />
            );
          })}
          {this.state.flipped && (
            <div className="col-6">
              <ul className="nav justify-content-end">
                <li className="nav-item">
                  <ButtonGetOne
                    color="white"
                    onClick={() => {
                      this.props.onGetOne(this.props.id);
                    }}
                  />
                </li>
                <li className="nav-item">
                  <ButtonDelOne color="white" />
                </li>
              </ul>
            </div>
          )}
        </div>
      </HoverObserver>
    );
  }
}

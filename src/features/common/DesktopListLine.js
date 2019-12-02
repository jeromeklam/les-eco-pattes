import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HoverObserver, ButtonGetOne, ButtonDelOne, ConfirmResponsive } from '../layout';
import { DesktopListLineCol } from './';
import { getObjectmemberValue } from '../../common';

export default class DesktopListLine extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    onGetOne: PropTypes.func.isRequired,
    onDelOne: PropTypes.func,
    cols: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      flipped: false,
      confirm: false,
    };
    this.mouseLeave = this.mouseLeave.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
    this.onConfirmDel = this.onConfirmDel.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  mouseLeave(event) {
    this.setState({ flipped: false });
  }

  mouseEnter(event) {
    this.setState({ flipped: true });
  }

  onConfirmDel(event) {
    const confirm = this.state.confirm;
    this.setState({ confirm: !confirm });
  }

  onModalClose(event) {
    this.setState({ confirm: false });
  }

  onConfirm(event) {
    this.setState({ confirm: false });
    this.props.onDelOne(this.props.id);
  }

  render() {
    const item = this.props.item;
    console.log(this.state.confirm);
    return (
      <div>
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
              <div className="col-6 col-vertical-align">
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
                    <ButtonDelOne color="white" onClick={this.onConfirmDel} />
                  </li>
                </ul>
              </div>
            )}
          </div>
        </HoverObserver>
        <ConfirmResponsive show={this.state.confirm} onClose={this.onModalClose} onConfirm={this.onConfirm}/>
      </div>
    );
  }
}

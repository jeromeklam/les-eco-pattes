import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HoverObserver, ButtonGetOne, ButtonDelOne } from '../layout';

export default class DesktopLine extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
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
       <HoverObserver key={item.id} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
        <div className="row">
          <div className="col-20" onClick={() => {this.props.onGetOne(item.id)}}>
            <span>{item.data_name}</span>
          </div>
          <div className="col-10">
            {
              {
                LIST: <span>Liste</span>,
                STRING: <span>Chaine</span>,
                NUMBER: <span>Nombre</span>,
                BOOLEAN: <span>Booléen</span>,
                DATE: <span>Date</span>,
                DATETIME: <span>Date / heure</span>,
              }[item.data_type]
            }
          </div>
          {this.state.flipped && (
            <div className="col-6">
              <ul className="nav justify-content-end">         
                <li className="nav-item">
                  <ButtonGetOne color="white" onClick={() => {this.props.onGetOne(item.id)}} />
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

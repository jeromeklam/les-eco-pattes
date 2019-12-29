import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class StatCard extends Component {
  static propTypes = {};

  render() {
    const num = new Intl.NumberFormat('fr-FR').format(this.props.count);
    let counter = "";
    if (this.props.unit) {
      counter = num + " " + this.props.unit;
    } else {
      counter = num;
    }
    return (
      <div className="col-lg-9 col-md-18 col-sm-18">
        <div className="card card-stats">
          <div className="card-header card-header-warning card-header-icon">
            { (this.props.url) ? (
              <NavLink strict className="nav-link link" to={this.props.url}>
                <div className="card-icon card-icon-btn">{this.props.icon}</div>
              </NavLink>
            ) : (
              <div className="link">
                <div className="card-icon">{this.props.icon}</div>
              </div>
            )}
            <p className="card-category">{this.props.title}</p>
            <h3 className="card-title">{counter}</h3>
          </div>
          <div className="card-footer">
            <div className="stats">
            </div>
          </div>
        </div>
      </div>
    );
  }
}

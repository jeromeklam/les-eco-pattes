import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class StatCard extends Component {
  static propTypes = {};

  render() {
    const num = new Intl.NumberFormat('fr-FR').format(this.props.count);
    return (
      <div className="col-lg-9 col-md-18 col-sm-18">
        <div className="card card-stats">
          <div className="card-header card-header-warning card-header-icon">
            <div className="card-icon">{this.props.icon}</div>
            <p className="card-category">{this.props.title}</p>
            <h3 className="card-title">{num}</h3>
          </div>
          <div className="card-footer">
            <div className="stats">
              {this.props.url && (
                <NavLink strict className="nav-link" to={this.props.url}>
                  {this.props.title}
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

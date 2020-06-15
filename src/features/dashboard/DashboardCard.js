import React, { Component } from 'react';
import ScrollArea from 'react-scrollbar';
import { NavLink } from 'react-router-dom';

export default class DashboardCard extends Component {
  static propTypes = {};

  render() {
    let counter = null;
    let num = 0;
    if (this.props.count) {
      try {
        num = new Intl.NumberFormat('fr-FR').format(this.props.count);
      } catch (ex) {}
      if (this.props.unit) {
        counter = num + ' ' + this.props.unit;
      } else {
        counter = num;
      }
    }
    console.log(this.props);
    return (
      <div className="dashboard-stat-card text-center">
        <div className="card">
          <div className="card-header card-header-warning card-header-icon">
            {this.props.url ? (
              <NavLink strict className="nav-link link" to={this.props.url}>
                <div className="card-icon card-icon-btn">{this.props.icon}</div>
              </NavLink>
            ) : (
              <div className="nav-link link">
                <div className="card-icon card-icon-btn">{this.props.icon}</div>
              </div>
            )}
            <p className="card-category">{this.props.title}</p>
            {this.props.header}
          </div>
          <div className="card-body" style={{ height: '100%' }}>
            {counter && <h3 className="card-title">{counter}</h3>}
            <ScrollArea style={{ height: '100%' }} noScrollX>
              {this.props.children && <div>{this.props.children}</div>}
            </ScrollArea>
          </div>
          <div className="card-footer">
            <div className="stats"></div>
          </div>
        </div>
      </div>
    );
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

export default class StatCard extends Component {
  static propTypes = {
    count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    unit: PropTypes.string,
    url: PropTypes.string,
    icon: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.element,
    size: PropTypes.string,
  };

  static defaultProps = {
    count: 0,
    url: null,
    unit: null,
    children: null,
    size: 'xs',
  };

  render() {
    let classname = '';
    let counter = null;
    let num = 0;
    if (this.props.count) {
      try {
        num = new Intl.NumberFormat('fr-FR').format(this.props.count);
      } catch (ex) {}
      if (this.props.unit) {
        counter = num + " " + this.props.unit;
      } else {
        counter = num;
      }
    }
    switch (this.props.size) {
      case 'lg': {
        classname = 'col-xs-w36';
        break;
      }
      case 'md': {
        classname = 'col-lg-w18 col-md-w36 col-sm-w36';
        break;
      }
      case 'sm': {
        classname = 'col-lg-w9 col-md-w18 col-sm-w18';
        break;
      }
      default: {
        classname = 'col-lg-w9 col-md-w18 col-sm-w18';
        break;
      }
    }
    return (
      <div className={classnames('ui-stat-card', classname)}>
        <div className="card card-stats">
          <div className="card-header card-header-warning card-header-icon">
            { (this.props.url) ? (
              <NavLink strict className="nav-link link" to={this.props.url}>
                <div className="card-icon card-icon-btn">{this.props.icon}</div>
              </NavLink>
            ) : (
              <div className="nav-link link">
                <div className="card-icon card-icon-btn">{this.props.icon}</div>
              </div>
            )}
            <p className="card-category">{this.props.title}</p>
            {counter && 
              <h3 className="card-title">{counter}</h3>
            }
            {this.props.children && 
              <div>
                {this.props.children}
              </div>
            }
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

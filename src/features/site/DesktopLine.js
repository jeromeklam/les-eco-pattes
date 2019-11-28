import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class DesktopLine extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  render() {
    const item = this.props.item;
    return (
      <div key={item.id} className="desktop-line row">
        <div className="col-10">
            <Link to={"/site/modify/" + item.id}>{item.site_name}</Link>
        </div>
        <div className="col-10">
            <Link className="misc" to={"/site/modify/" + item.id}>{item.site_address1}</Link>
        </div>
        <div className="col-4">
            <Link className="misc"  to={"/site/modify/" + item.id}>{item.site_cp}</Link>
        </div>
        <div className="col-12">
            <Link className="misc" to={"/site/modify/" + item.id}>{item.site_town}</Link>
        </div>
      </div>
    );
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class MobileLine extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  render() {
    const item = this.props.item;
    return (
      <div key={item.id} className="site-mobile-line row">
        <div className="col-36">
          <div className="card">
            <div className="card-heading">
              <Link to={"/site/modify/" + item.id}>{item.site_name}</Link>
            </div>
            <div className="card-body">
              <div className="col-36">
                {item.site_address1}
              </div>
              <div className="row">
                <div className="col-7">
                  {item.site_cp}
                </div>
                <div className="col-29">
                  {item.site_town}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

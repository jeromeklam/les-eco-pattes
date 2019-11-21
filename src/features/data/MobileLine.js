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
      <div key={item.id} className="row">
        <div className="col-36">
          <div className="card">
            <div className="card-heading">
              <Link to={"/data/modify/" + item.id}>{item.data_name}</Link>
            </div>
            <div className="card-body">
              {item.data_name}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

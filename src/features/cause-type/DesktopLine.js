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
      <div key={item.id} className="row">
        <div className="col-12">
            <Link to={"/cause-type/modify/" + item.id}>{item.caut_name}</Link>
        </div>
      </div>
    );
  }
}

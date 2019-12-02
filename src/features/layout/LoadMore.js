import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class LoadMore extends Component {
  static propTypes = {
    onLoadMore: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className="layout-load-more">
        <div className="row">
          <div className="col-36">
            <button onClick={this.props.onLoadMore} className="btn btn-primary btn-lg btn-block">Plus</button>
          </div>
        </div>
      </div>
    );
  }
}

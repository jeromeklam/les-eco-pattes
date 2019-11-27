import React, { Component } from 'react';

export default class LoadMore extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="layout-load-more">
        <div className="row">
          <div className="col-36">
            <button onClick={this.props.onMore} className="btn btn-primary btn-lg btn-block">Plus</button>
          </div>
        </div>
      </div>
    );
  }
}

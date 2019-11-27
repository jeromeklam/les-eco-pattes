import React, { Component } from 'react';

export default class LoadComplete extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="layout-load-more">
        <div className="row">
          <div className="col-36">
            <button className="btn btn-secondary btn-lg btn-block">Fin</button>
          </div>
        </div>
      </div>
    );
  }
}

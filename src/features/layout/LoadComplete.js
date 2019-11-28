import React, { Component } from 'react';

export default class LoadComplete extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="row">
        <div className="col-36">
          <button className="btn btn-light btn-lg btn-block">Fin</button>
        </div>
      </div>
    );
  }
}

import React, { Component } from 'react';

export default class LoadingData extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="layout-loading-data">
        <div className="lds-grid">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}

import React, { Component } from 'react';
import { Loading3Dots } from 'freeassofront';

export default class CenteredLoading3Dots extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="text-center pt-2 text-primary">
        <Loading3Dots />
      </div>
    );
  }
}

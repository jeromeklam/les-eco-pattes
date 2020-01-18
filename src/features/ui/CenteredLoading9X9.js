import React, { Component } from 'react';
import { Loading9x9 } from 'freeassofront';

export default class CenteredLoading9X9 extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="text-center mt-2 text-primary">
        <Loading9x9 />
      </div>
    );
  }
}

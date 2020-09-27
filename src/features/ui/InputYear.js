import React, { Component } from 'react';
import { InputSelect } from 'react-bootstrap-front';

const getYears = () => {
  let year = new Date().getFullYear();
  let years = [{value: '', label: ''}];    
  while (year > 1950) {
    years.push({value: year, label: year});
    year--;
  }
  return years;
};

export default class InputYear extends Component {
  static propTypes = {

  };

  render() {
    return (
      <InputSelect {...this.props} options={getYears()}/>
    );
  }
}

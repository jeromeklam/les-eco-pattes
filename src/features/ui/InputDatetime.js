import React, { Component } from 'react';
import { InputDatetime as RBFInputDatetime } from 'react-bootstrap-front';
import { Calendar as CalendarIcon, DelOne as DelOneIcon } from '../icons';

export default class InputDatetime extends Component {
  render() {
    return (
      <RBFInputDatetime
        {...this.props}
        calIcon={<CalendarIcon className="text-secondary" size={0.9} />}
        delIcon={<DelOneIcon className="text-warning" size={0.9} />}
      />
    );
  }
}

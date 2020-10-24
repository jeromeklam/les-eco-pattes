import React, { Component } from 'react';
import { InputDate as RBFInputDate } from 'react-bootstrap-front';
import { Calendar as CalendarIcon, DelOne as DelOneIcon } from '../icons';

export default class InputDate extends Component {
  render() {
    return (
      <RBFInputDate
        {...this.props}
        calIcon={<CalendarIcon className="text-secondary" size={0.9} />}
        delIcon={<DelOneIcon className="text-warning" size={0.9} />}
      />
    );
  }
}

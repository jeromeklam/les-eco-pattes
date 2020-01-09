import React, { Component } from 'react';
import { InputDate as FAInputDate } from 'freeassofront';
import { Calendar as CalendarIcon, DelOne as DelOneIcon } from '../icons';

export default class InputDate extends Component {
  render() {
    return (
      <FAInputDate {...this.props} calIcon={<CalendarIcon className="text-primary" />} delIcon={<DelOneIcon className="text-warning"/>}/>
    );
  }
}

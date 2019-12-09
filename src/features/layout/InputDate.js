import React, { Component } from 'react';
import DatePicker from  "react-datepicker";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import fr from 'date-fns/locale/fr';

registerLocale('fr', fr)

export default class InputDate extends Component {
  static propTypes = {

  };

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {

  }

  render() {
    let value = '';
    if (this.props.value && this.props.value !== null) {
      value = this.props.value;
    }
    let id = this.props.name;
    if (this.props.id && this.props.id !== null) {
      id = this.props.id;
    }
    let props = {
      ...this.props,
      value: value,
      id: id
    };
    return (
      <div className="form-group row">
        <label htmlFor={this.props.id} className="col-sm-6 col-form-label">
          {this.props.label}
          {this.props.required && 
           <span>&nbsp;*</span>
          }
        </label>
        <div className="col-sm-30">
          <DatePicker
            locale="fr"
            type="text"
            id={props.id}
            className="form-control" 
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

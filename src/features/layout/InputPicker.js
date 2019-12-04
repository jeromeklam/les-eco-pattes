import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { More } from '../icons';
import axios from 'axios';

export default class InputPicker extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    pickerAutocomplete: PropTypes.string.isRequired,
    pickerId: PropTypes.string.isRequired,
    pickerValue: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      content: this.props.content,
      search: false,
      list: null,
      cancel: false,
    };
    this.onMore = this.onMore.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  onMore() {
    this.setState({ search: true });
  }

  onChange(event) {
    if (this.state.source) {
      this.state.source.cancel();
    }
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      cancelToken: source.token,
    };
    this.setState({ content: event.target.value, loading: true, cancel: source });
    axios
      .get(process.env.REACT_APP_BO_URL + this.props.pickerAutocomplete + event.target.value, {
        headers: headers,
      })
      .then(result => {
        this.setState({ list: result.data, loading: false });
      });
  }

  onSelect(item) {
    const id = item[this.props.pickerId];
    const value = item[this.props.pickerValue];
    console.log(id, value, this.props.pickerOnChange);
    this.setState({ value: id, content: value, list: false });
    this.props.onChange({ target: { name: this.props.name, value: id } });
  }

  render() {
    console.log('search inputPicker', this.state.search);

    return (
      <div className="form-group row layout-input-picker">
        <label htmlFor={this.props.id} className="col-sm-6 col-form-label">
          {this.props.label}
        </label>
        <div className="col-sm-30">
          <div className="row">
            <div className="col-36 input-group">
              <input type="hidden" name={'autocomplete-field-@'} value={this.state.value} />
              <input
                type="text"
                name={'field-@'}
                value={this.state.content}
                className="form-control"
                onChange={this.onChange}
              />
              <div className="input-group-append">
                <button type="button" className="btn btn-outline-success" onClick={this.onMore}>
                  <More color="green" />
                </button>
              </div>
              {this.state.list && this.state.list.length > 0 && (
                <div className="dropdown-menu show">
                  {this.state.list.map(item => {
                    return (
                      <a
                        className="dropdown-item"
                        onClick={() => {
                          this.onSelect(item);
                        }}
                      >
                        {item[this.props.pickerValue]}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

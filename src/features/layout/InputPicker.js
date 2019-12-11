import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { More, DelOne } from '../icons';
import axios from 'axios';

export default class InputPicker extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    pickerAutocomplete: PropTypes.string.isRequired,
    pickerId: PropTypes.string.isRequired,
    pickerValue: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSearchMore: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      display: this.props.display,
      search: false,
      list: null,
      cancel: false,
    };
    this.onClear = this.onClear.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  onClear() {
    if (this.state.source) {
      this.state.source.cancel();
    }
    this.setState({ content: '', loading: false, cancel: false });
    this.props.onChange({ target: { name: this.props.name, value: null } });
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
    const search = '' + event.target.value;
    this.setState({ content: search, loading: true, cancel: source });
    if (search.length >= 2) {
      axios
        .get(process.env.REACT_APP_BO_URL + this.props.pickerAutocomplete + event.target.value, {
          headers: headers,
        })
        .then(result => {
          this.setState({ list: result.data, loading: false });
        });
    }
  }

  onSelect(item) {
    const id = item[this.props.pickerId];
    const value = item[this.props.pickerValue];
    this.setState({ value: id, content: value, list: false });
    this.props.onChange({ target: { name: this.props.name, value: id } });
  }

  render() {
    console.log('search inputPicker', this.props.pickerSearch);

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
                <button type="button" className="btn btn-outline-warning" onClick={this.onClear}>
                  <DelOne color="orange" />
                </button>
                {this.props.onSearchMore &&
                  <button type="button" className="btn btn-outline-success" onClick={this.props.onSearchMore}>
                    <More color="green" />
                  </button>
                }
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

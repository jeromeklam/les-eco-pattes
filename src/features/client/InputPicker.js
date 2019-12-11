import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputPicker as LayoutInputPicker } from '../layout';
import { Search } from './';
import { freeAssoApi, jsonApiNormalizer, buildModel } from '../../common';
import { More, DelOne } from '../icons';

export default class InputPicker extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      search: false,
      value: this.props.value,
      display: '...',
      autocomplete: false,
    };
    this.onMore = this.onMore.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCloseMore = this.onCloseMore.bind(this);
    this._loadClient = this._loadClient.bind(this);
  }

  _loadClient(id) {
    if (id && id !== '0') {
      const doRequest = freeAssoApi.get('/v1/asso/client/' + id, {});
      this.setState({ loading: true, finish: false, list: [] });
      doRequest.then(result => {
        let display = '';
        if (result && result.data) {
          const lines = jsonApiNormalizer(result.data);
          const item = buildModel(lines, 'FreeAsso_Client', id);
          console.log(item);
          display = item.cli_lastname;
        }
        console.log(display);
        this.setState({ display: display });
      })
      .catch(err => {
        this.setState({ display: '' });
      })
      ;
    } else {
      this.setState({ display: '' });
    }
  }

  componentDidMount() {
    this._loadClient(this.state.value);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.value !== prevState.value ||
      (prevState.autocomplete === true && this.state.autocomplete != prevState.autocomplete)
    ) {
      this._loadClient(this.state.value);
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.value) {
      return { value: props.value, display: '...' };
    }
    return null;
  }

  onClear() {
    this.setState({ autocomplete: false });
    this.props.onChange({ target: { name: this.props.name, value: null } });
  }

  onMore() {
    this.setState({ search: true, autocomplete: false });
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value, autocomplete: true });
  }

  onSelect(item) {
    this.setState({ search: false, autocomplete: false });
    this.props.onChange({ target: { name: this.props.name, value: item.id } });
  }

  onCloseMore() {
    this.setState({ search: false });
  }

  render() {
    return (
      <div className="client-input-picker">
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
                  name={'display'}
                  value={this.state.display}
                  className="form-control"
                  onChange={this.onChange}
                />
                <div className="input-group-append">
                  <button type="button" className="btn btn-outline-warning" onClick={this.onClear}>
                    <DelOne color="orange" />
                  </button>
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
        <Search
          title={this.props.label}
          show={this.state.search}
          onClose={this.onCloseMore}
          onSelect={this.onSelect}
        />
      </div>
    );
  }
}

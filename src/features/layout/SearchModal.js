import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ModalResponsive, LoadingData } from './';

export default class SearchModal extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    onClear: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    list: PropTypes.array.isRequired,
    pickerDisplay: PropTypes.string.isRequired,
    filters: PropTypes.array,
  };

  constructor(props) {
    super(props);
    let filters = this.props.filters;
    filters.map(item => {
      item.value = '';
    });
    this.state = {
      fields: filters,
      condition: 'or',
    };
    this.onChange = this.onChange.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onChange(event) {
    let filters = this.state.fields;
    filters.map(item => {
      if (item.name === event.target.name) {
        item.value = event.target.value;
      }
    });
    this.setState({ fields: filters });
  }

  onClear(event) {
    let filters = this.state.fields;
    filters.map(item => {
      item.value = '';
    });
    this.setState({ fields: filters });
    this.props.onClear();
  }

  onSearch(event) {
    let params = false;
    this.state.fields.map(item => {
        if (item.value != '') {
          if (params === false) {
            params = { filter: { [this.state.condition]: {} }};
          }
          params.filter[this.state.condition][item.name] = item.value;
      }
    });
    const filters = params || {};
    this.props.onSearch(filters);
  }

  render() {
    return (
      <ModalResponsive
        size="lg"
        title={this.props.title}
        show={this.props.show}
        onClose={this.props.onClose}
      >
        <div>
          <div className="search-filters">
            <div className="row">
              <div className="col-30">
                {this.state.fields &&
                  this.state.fields.map(item => {
                    return (
                      <input
                        key={item.name}
                        className="form-control"
                        value={item.value}
                        name={item.name}
                        placeholder={item.label}
                        type="text"
                        onChange={this.onChange}
                      />
                    );
                  })}
              </div>
              <div className="col-6">
                <button type="button" onClick={this.onClear} className="btn btn-warning btn-block">
                  Effacer
                </button>
                <button type="button" onClick={this.onSearch} className="btn btn-primary btn-block">
                  Filtrer
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div className="search-results">
            {this.props.loading ? (
              <LoadingData />
            ) : (
              <ul className="list-group">
                {this.props.list &&
                  this.props.list.map(item => {
                    return (
                      <li
                        key={item.id}
                        className="list-group-item list-group-item-action"
                        onClick={() => {
                          this.props.onSelect(item);
                        }}
                      >
                        <p>{item[this.props.pickerDisplay]}</p>
                      </li>
                    );
                  })}
              </ul>
            )}
          </div>
        </div>
      </ModalResponsive>
    );
  }
}

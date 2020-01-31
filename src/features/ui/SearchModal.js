import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ResponsiveModal, Loading3Dots } from 'freeassofront';

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
    filters.forEach(item => {
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
    filters.forEach(item => {
      if (item.name === event.target.name) {
        item.value = event.target.value;
      }
    });
    this.setState({ fields: filters });
  }

  onClear(event) {
    let filters = this.state.fields;
    filters.forEach(item => {
      item.value = '';
    });
    this.setState({ fields: filters });
    this.props.onClear();
  }

  onSearch(event) {
    let params = false;
    this.state.fields.forEach(item => {
        if (item.value !== '') {
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
    const buttons = [
      {name: "Filtrer", function: this.onSearch, theme: "primary", icon: "filter" },
      {name: "Effacer", function: this.onClear, theme: "warning" , icon: "delete"},
      {name: "Annuler", function: this.props.onClose, theme: "dark", icon: "close"},
    ];
    return (
      <ResponsiveModal
        size="lg"
        title={this.props.title}
        show={this.props.show}
        onClose={this.props.onClose}
        buttons={buttons}
      >
        <div>
          <div className="search-filters">
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
              })
            }
          </div>
          <div className="search-results">
            {this.props.loading ? (
              <Loading3Dots />
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
      </ResponsiveModal>
    );
  }
}

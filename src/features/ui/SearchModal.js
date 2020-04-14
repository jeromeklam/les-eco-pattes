import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ResponsiveModal } from 'freeassofront';
import { CenteredLoading3Dots } from './';

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
      item.value = item.value || '';
    });
    this.state = {
      fields: filters,
      condition: 'and',
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
    const fields = this.props.pickerDisplay.split(',');
    const buttons = [
      {name: "Filtrer", function: this.onSearch, theme: "primary", icon: "filter" },
      {name: "Effacer", function: this.onClear, theme: "warning" , icon: "delete"},
      {name: "Annuler", function: this.props.onClose, theme: "secondary", icon: "close"},
    ];
    return (
      <ResponsiveModal
        size="lg"
        title={this.props.title}
        show={this.props.show}
        onClose={this.props.onClose}
        buttons={buttons}
      >
        <div className="search-modal">
          <h6 className="text-secondary">Critères de recherche :</h6>
          <div className="search-filters row">
            {this.state.fields &&
              this.state.fields.map((item, i) => {
                if (item.type === 'select') {
                  return (
                    <div className={classnames('col-sm-' + (item.size || '18'))} key={`${item.value}-${i}`}>
                      <select
                        className="form-control"
                        value={item.value}
                        name={item.name}
                        placeholder={item.label}
                        onChange={this.onChange}
                      >
                        <option value="">{item.label}</option>
                        {item.options.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                  );
                } else {
                  return (
                    <div className="col-sm-18" key={item.value}>
                      <input
                        className="form-control"
                        value={item.value}
                        name={item.name}
                        placeholder={item.label}
                        type="text"
                        onChange={this.onChange}
                      />
                    </div>
                  );
                }
              })
            }
          </div>
          <hr />
          <div className="search-results">
            {this.props.loading ? (
              <CenteredLoading3Dots />
            ) : (
              <div>
                <h6 className="text-secondary">Résultats :</h6>
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
                          <p>
                            {fields.map((elem, i) => (
                              <span className="mr-2" key={`key-${i}`}>
                                {item[elem] ? item[elem] : elem}
                              </span>
                            ))}
                          </p>
                        </li>
                      );
                    })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </ResponsiveModal>
    );
  }
}

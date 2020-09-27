import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { jsonApiNormalizer, objectToQueryString, normalizedObjectModeler } from 'freejsonapi';
import { freeAssoApi } from '../../common';
import { SearchModal } from '../ui';
import { clientTypeAsOptions } from '../client-type/functions.js';
import { clientCategoryAsOptions } from '../client-category/functions.js';

export default class Search extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    filters: PropTypes.object,
    typeCodes: PropTypes.array,
    categoryCodes: PropTypes.array,
  };
  static defaultProps = {
    filters: {},
    typeCodes: [],
    categoryCodes: [],
  }

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      list: [],
      loading: false,
      finish: false,
      filters: this.props.filters,
      typeCodes: this.props.typeCodes,
      categoryCodes: this.props.categoryCodes,
    };
    this.onChange = this.onChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onClear = this.onClear.bind(this);
  }

  onClear() {
    this.setState({ loading: false, finish: true, list: [] });
  }

  onSearch(filters) {
    if (!this.state.loading) {
      const addUrl = objectToQueryString(filters);
      const doRequest = freeAssoApi.get('/v1/asso/client' + addUrl, {});
      this.setState({ loading: true, finish: false, list: [] });
      doRequest.then(result => {
        let items = [];
        if (result && result.data) {
          const lines = jsonApiNormalizer(result.data);
          items = normalizedObjectModeler(lines, 'FreeAsso_Client');
        }
        this.setState({ loading: false, finish: true, list: items });
      });
    }
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const filters = [
      { name: 'cli_firstname', label: 'Prénom', type: 'text', value: this.props.value },
      { name: 'cli_lastname', label: 'Nom', type: 'text' },
      {
        name: 'clit_id',
        label: 'Type',
        type: 'select',
        options: clientTypeAsOptions(this.props.types, this.props.typeCodes),
        filtered: this.props.typeCodes.length > 0
      },
      {
        name: 'clic_id',
        label: 'Catégorie',
        type: 'select',
        options: clientCategoryAsOptions(this.props.categories, this.props.categoryCodes),
        filtered: this.props.categoryCodes.length > 0
      },
    ];
    return (
      <SearchModal
        title={this.props.title}
        show={this.props.show}
        loading={this.state.loading}
        onClose={this.props.onClose}
        onClear={this.onClear}
        onSearch={this.onSearch}
        onSelect={this.props.onSelect}
        list={this.state.list}
        pickerDisplay="cli_lastname"
        filters={filters}
      />
    );
  }
}

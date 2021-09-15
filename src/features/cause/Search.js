import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { jsonApiNormalizer, normalizedObjectModeler, objectToQueryString } from 'jsonapi-front';
import { SearchModal } from '../ui';
import { freeAssoApi } from '../../common';
import { causeTypeAsOptions } from '../cause-type/functions.js';
import { sexSelect } from './';

export default class Search extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      list: [],
      loading: false,
      finish: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onClear() {
    this.setState({ loading: false, finish: true, list: [] });
  }

  onClose() {
    this.onClear();
    this.props.onClose();
  }

  onSearch(filters) {
    if (!this.state.loading) {
      const addUrl = objectToQueryString(filters);
      const doRequest = freeAssoApi.get('/v1/asso/cause' + addUrl, {});
      this.setState({ loading: true, finish: false, list: [] });
      doRequest.then(result => {
        let items = [];
        if (result && result.data) {
          const lines = jsonApiNormalizer(result.data);
          items = normalizedObjectModeler(lines, 'FreeAsso_Cause');
        }
        this.setState({ loading: false, finish: true, list: items });
      });
    }
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    let filters = [
      { name: 'cau_code', label: 'N° boucle', type: 'text', value: this.props.value },      
      {
        name: 'cau_sex',
        label: 'Sexe',
        type: 'select',
        value: this.props.filterSex || '',
        options: sexSelect,
      },
      {
        name: 'caut_id',
        label: 'Race',
        type: 'select',
        options: causeTypeAsOptions(this.props.types),
      },
    ];
    filters = filters.concat(this.props.filters);
    return (
      <SearchModal
        title={this.props.title}
        show={this.props.show}
        loading={this.state.loading}
        onClose={this.onClose}
        onClear={this.onClear}
        onSearch={this.onSearch}
        onSelect={this.props.onSelect}
        list={this.state.list}
        pickerDisplay="cau_code"
        filters={filters}
      />
    );
  }
}

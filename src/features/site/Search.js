import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SearchModal } from '../ui';
import { freeAssoApi } from '../../common';
import { jsonApiNormalizer, normalizedObjectModeler, objectToQueryString } from 'jsonapi-front';

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
      const doRequest = freeAssoApi.get('/v1/asso/site' + addUrl, {});
      this.setState({ loading: true, finish: false, list: [] });
      doRequest.then(result => {
        let items = [];
        if (result && result.data) {
          const lines = jsonApiNormalizer(result.data);
          items = normalizedObjectModeler(lines, 'FreeAsso_Site');
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
      { name: 'site_name', label: 'Nom', type: 'text', value: this.props.value },
      { name: 'site_code', label: 'N° EDE', type: 'text' },
    ];
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
        pickerDisplay="site_name,site_code"
        filters={filters}
      />
    );
  }
}

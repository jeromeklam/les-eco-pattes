import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputPicker as DefaultInputPicker } from 'freeassofront';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { freeAssoApi } from '../../common';
import * as actions from './redux/actions';
import { Search, Modify } from './';
import { More, DelOne, Zoom } from '../icons';

export class InputPicker extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    item: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    filters: PropTypes.object,
    typeCodes: PropTypes.array,
    categoryCodes: PropTypes.array,
  };
  static defaultProps = {
    filters: {},
    typeCodes: [],
    categoryCodes: [],
  };

  static getDerivedStateFromProps(props, state) {
    if (props.item !== state.item) {
      let value = null;
      let display = '';
      if (props.item) {
        value = props.item.id || '';
        display = props.item.cli_lastname || '';
        if (props.item.cli_firstname) {
          display = display + ' ' + props.item.cli_firstname;
          display.trim();
        }
      }
      return { item: props.item, value: value, display: display };
    }
    return null;
  }

  constructor(props) {
    super(props);
    let value = '';
    let display = '';
    if (this.props.item) {
      value = this.props.item.id || '';
      display = this.props.item.cli_lastname || '';
      if (this.props.item.cli_firstname) {
        display = display + ' ' + this.props.item.cli_firstname;
        display.trim();
      }
    }
    this.state = {
      search: false,
      item: this.props.item || null,
      list: [],
      value: value,
      display: display,
      autocomplete: false,
      source: false,
      zoom: false,
      filters: this.props.filters,
      typeCodes: this.props.typeCodes,
      categoryCodes: this.props.categoryCodes,
    };
    this.onMore = this.onMore.bind(this);
    this.onZoom = this.onZoom.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onCloseMore = this.onCloseMore.bind(this);
  }

  onChange(event) {
    if (this.state.source) {
      this.state.source.cancel();
    }
    const source = axios.CancelToken.source();
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    const search = '' + event.target.value;
    this.setState({ display: search, loading: true, cancel: source });
    if (search.length >= 2) {
      freeAssoApi
        .get(process.env.REACT_APP_BO_URL + '/v1/asso/client/autocomplete/' + event.target.value, {
          headers: headers,
          cancelToken: source.token,
        })
        .then(result => {
          this.setState({ list: result.data, loading: false });
        }).catch (err => {this.setState({ list: [], loading: false });});
    }
  }

  onMore() {
    this.setState({ search: true, autocomplete: false });
  }

  onZoom() {
    this.setState({ zoom: true });
  }

  onClear() {
    this.setState({ autocomplete: false });
    this.props.onChange({
      target: { name: this.props.name, value: null, type: 'FreeAsso_Client' },
    });
  }

  onSelect(item) {
    this.setState({ search: false, autocomplete: false, list: [] });
    if (item) {
      this.props.onChange({
        target: { name: this.props.name, value: item.id, type: 'FreeAsso_Client' },
      });
    }
  }

  onCloseMore() {
    this.setState({ search: false, zoom: false });
  }

  render() {
    return (
      <div className="client-input-picker">
        <DefaultInputPicker 
          name={this.props.name}
          label={this.props.label}
          value={this.state.value}
          pickerUp={this.props.pickerUp || false}
          labelTop={this.props.labelTop || true}
          size={this.props.size}
          labelSize={this.props.labelSize || 6}
          inputSize={this.props.inputSize || 30}
          list={this.state.list}
          display={this.state.display}
          onChange={this.onChange}
          onClear={this.onClear}
          onMore={this.onMore}
          onZoom={this.onZoom}
          onSelect={this.onSelect}
          required={this.props.required || false}
          error={this.props.error}
          pickerId="cli_id"
          pickerDisplay="cli_lastname,cli_firstname"
          clearIcon={<DelOne size={this.props.size === 'sm' ? 0.7 : 0.9} className="text-warning" />}
          moreIcon={<More size={this.props.size === 'sm' ? 0.7 : 0.9} className="text-secondary" />}
          zoomIcon={<Zoom className="text-secondary" size={0.9} />}
        />
        <Search
          title={this.props.label}
          show={this.state.search}
          onClose={this.onCloseMore}
          onSelect={this.onSelect}
          types={this.props.clientType.items}
          categories={this.props.clientCategory.items}
          filters={this.props.filters || {}}
          typeCodes={this.props.typeCodes || []}
          categoryCodes={this.props.categoryCodes || []}
        />
        {this.state.zoom && (
          <Modify loader={false} modal={true} cliId={this.state.item.id} onClose={this.onCloseMore} />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    client: state.client,
    clientType: state.clientType,
    clientCategory: state.clientCategory,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InputPicker);

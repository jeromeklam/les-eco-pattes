import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputPicker as DefaultInputPicker } from 'react-bootstrap-front';
import axios from 'axios';
import { freeAssoApi } from '../../common';
import { More, DelOne, Zoom } from '../icons';
import { Search, Input } from './';

export default class InputPicker extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    item: PropTypes.object,
    onChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    let value = '';
    let display = '';
    if (this.props.item) {
      value = this.props.item.id || '';
      display = this.props.item.sick_name || '';
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
    };
    this.onMore = this.onMore.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onZoom = this.onZoom.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onCloseMore = this.onCloseMore.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.item !== state.item) {
      let value = null;
      let display = '';
      if (props.item) {
        value = props.item.id || '';
        display = props.item.sick_name;
      }
      return { item: props.item, value: value, display: display };
    }
    return null;
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
        .get(process.env.REACT_APP_BO_URL + '/v1/asso/sickness/autocomplete/' + event.target.value, {
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
      target: { name: this.props.name, value: null, type: 'FreeAsso_Sickness' },
    });
  }

  onSelect(item) {
    this.setState({ search: false, autocomplete: false, list: [] });
    if (item) {
      this.props.onChange({
        target: { name: this.props.name, value: item.id, type: 'FreeAsso_Sickness' },
      });
    }
  }

  onCloseMore() {
    this.setState({ search: false, zoom: false });
  }

  render() {
    return (
      <div className="sickness-input-picker">
        <DefaultInputPicker 
          name={this.props.name}
          label={this.props.label}
          value={this.state.value}
          labelTop={this.props.labelTop || true}
          size={this.props.size}
          labelSize={this.props.labelSize || 6}
          inputSize={this.props.inputSize || 30}
          list={this.state.list}
          display={this.state.display}
          onChange={this.onChange}
          onClear={this.onClear}
          onZoom={this.onZoom}
          onMore={this.onMore}
          onSelect={this.onSelect}
          required={this.props.required || false}
          error={this.props.error}
          pickerId="sick_id"
          pickerDisplay="sick_name"
          clearIcon={<DelOne size={this.props.size === 'sm' ? 0.7 : 0.9} className="text-warning" />}
          moreIcon={<More size={this.props.size === 'sm' ? 0.7 : 0.9} className="text-secondary" />}
          zoomIcon={<Zoom size={this.props.size === 'sm' ? 0.7 : 0.9} className="text-secondary" />}
        />
        <Search
          title={this.props.label}
          value={this.state.display}
          show={this.state.search}
          onClose={this.onCloseMore}
          onSelect={this.onSelect}
        />
        {this.state.zoom && (
          <Input loader={false} modal={true} sickId={this.state.item.id} onClose={this.onCloseMore} />
        )}
      </div>
    );
  }
}

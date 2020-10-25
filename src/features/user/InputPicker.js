import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputPicker as DefaultInputPicker } from 'react-bootstrap-front';
import axios from 'axios';
import { freeAssoApi } from '../../common';
import { More, DelOne, Zoom } from '../icons';
import { Search, getFullName } from './';

export default class InputPicker extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    item: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    multi: PropTypes.bool,
  };

  static defaultProps = {
    multi: false,
  };

  constructor(props) {
    super(props);
    let value = '';
    let display = '';    
    if (this.props.item) {
      value = this.props.item.id;
      display = getFullName(props.item);
    }
    this.state = {
      search: false,
      item: props.item || null,
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
        display = getFullName(props.item);
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
        .get(process.env.REACT_APP_BO_URL + '/v1/sso/user/autocomplete/' + search, {
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
      target: { name: this.props.name, value: null, type: 'FreeSSO_User' },
    });
  }

  onSelect(item) {
    this.setState({ search: false, autocomplete: false, list: [] });
    if (item) {
      this.props.onChange({
        target: { name: this.props.name, value: item.id, type: 'FreeSSO_User' },
      });
    }
  }

  onCloseMore() {
    this.setState({ search: false, zoom: false });
  }

  render() {
    return (
      <div className="user-input-picker">
        <DefaultInputPicker 
          {...this.props}
          name={this.props.name}
          label={this.props.label}
          labelTop={true}
          value={this.state.value || ''}
          list={this.props.list || this.state.list}
          display={this.state.display}
          onChange={this.props.onFineChange || this.onChange}
          onClear={this.onClear}
          onMore={this.onMore}          
          onZoom={this.onZoom}
          error={this.props.error}
          onSelect={this.onSelect}
          required={this.props.required || false}
          pickerId="user_id"
          pickerDisplay={getFullName}
          filters={this.props.filters || {}}
          clearIcon={<DelOne className="text-warning" size={0.9} />}
          moreIcon={<More className="text-secondary" size={0.9} />}
          zoomIcon={<Zoom className="text-secondary" size={0.9} />}
        />
        <Search
          title={this.props.label}
          value={this.state.display}
          show={this.state.search}
          filters={this.props.filters || {}}
          onClose={this.onCloseMore}
          onSelect={this.onSelect}
        />
      </div>
    );
  }
}
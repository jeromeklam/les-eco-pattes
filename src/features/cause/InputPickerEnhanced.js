import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { freeAssoApi } from '../../common';
import { InputPicker as DefaultInputPicker, InputSelect } from 'react-bootstrap-front';
import { causeTypeAsOptions } from '../cause-type/functions.js';
import { sexSelect } from '../cause';
import { More, DelOne, Zoom } from '../icons';
import { Search, Input, displayItemPicker, getPickerDisplay } from './';

export default class InputPickerEnhanced extends Component {
  static propTypes = {
    code: PropTypes.string.isRequired,
    item: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    multi: PropTypes.bool,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    multi: false,
    disabled: false,
  };

  constructor(props) {
    super(props);
    let value = '';
    let display = '';
    if (this.props.item) {
      value = props.item.id || '';
      display = (props.item.type !== '' && getPickerDisplay(props.item)) || (props.multi && props.item.id);
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
    this.onZoom = this.onZoom.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onZoom = this.onZoom.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onCloseMore = this.onCloseMore.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.item !== state.item || props.list !== state.list) {
      let value = null;
      let display = '';
      value = props.item.id || '';
      display = getPickerDisplay(props.item);
      return { item: props.item, value: value, display: display, list: props.list };
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
        .get(process.env.REACT_APP_BO_URL + '/v1/asso/cause/autocomplete/' + event.target.value, {
          headers: headers,
          cancelToken: source.token,          
        })
        .then(result => {
          this.setState({ list: result.data, loading: false });
        })
        .catch(err => {
          this.setState({ list: [], loading: false });
        });
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
      target: { code: this.props.code, value: null, type: 'FreeAsso_Cause' },
    });
  }

  onSelect(item) {
    this.setState({ search: false, autocomplete: false, list: [] });
    if (item) {
      this.props.onChange({
        target: { code: this.props.code, value: item.id, type: 'FreeAsso_Cause' },
      });
    } else {
      this.props.onClose();
    }
  }

  onCloseMore() {
    this.setState({ search: false, zoom: false });
  }

  handleChange(event) {
    
  }

  render() {
    return (
      <div className="cause-input-picker">
        <div className="row">
          <div className="col-sm-w10">
            <DefaultInputPicker
              {...this.props}
              code={this.props.code}
              label=""
              labelTop={false}
              value={this.state.value || ''}
              list={this.state.list}
              display={this.state.display}
              onChange={this.props.onFineChange || this.onChange}
              onClear={this.onClear}
              onMore={this.onMore}
              onZoom={this.onZoom}
              error={this.props.error}
              onSelect={this.onSelect}
              required={this.props.required || false}
              pickerId="cau_id"
              pickerDisplay={displayItemPicker}
              filters={this.props.filters || {}}
              disabled={this.props.disabled}
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
          <div className="col-sm-w10">
            <InputSelect
              name="cause_type.id"
              value={this.state.item.cause_type ? this.state.item.cause_type.id : null}
              addempty={true}
              onChange={this.props.onHandleChange}
              options={causeTypeAsOptions(this.props.cause_types)}
              disabled={(this.state.item && parseInt(this.state.item.id, 10) > 0) || this.props.disabled}
              labelTop={false}
              required={true}
            />
          </div>
          <div className="col-sm-w8">
            <InputSelect
              name="cau_sex"
              id="cau_sex"
              value={this.state.item && this.state.item.cau_sex}
              onChange={this.props.onHandleChange}
              options={sexSelect}
              disabled={(this.state.item && parseInt(this.state.item.id, 10) > 0) || this.props.disabled}
              labelTop={false}
            />
          </div>
          <div className="col-sm-w4">
            {!this.props.disabled &&
              <button className="btn btn-warning" onClick={this.props.onDelOne}>
                <DelOne className="text-light"/>
              </button>
            }
          </div>
        </div>
        {this.state.zoom && (
          <Input
            loader={false}
            modal={true}
            cauId={this.state.item.id}
            onClose={this.onCloseMore}
          />
        )}
      </div>
    );
  }
}

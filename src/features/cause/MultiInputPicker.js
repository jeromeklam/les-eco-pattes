import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { freeAssoApi } from '../../common';
import { AddOne as AddOneIcon } from '../icons';
import { CenteredLoading3Dots } from '../ui';
import { InputPickerEnhanced, getCause } from './';
import { getCauseType } from '../cause-type';

export default class MultiInputPicker extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
  };
  static defaultProps = {
    disabled: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      autocomplete: false,
      source: false,
      emptyItem: {},
      loading: false,
      mouting: true,
      index: -1,
    };
    this.onChange = this.onChange.bind(this);
    this.addOne = this.addOne.bind(this);
    this.delOne = this.delOne.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onFineChange = this.onFineChange.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
  }

  componentDidMount() {
    getCause(0).then(result => {
      this.setState({ emptyItem: result, mouting: false });
    });
  }

  addOne() {
    let { causes } = this.props;
    let { list } = this.state;
    const newItem = {...this.state.emptyItem};
    if (!Array.isArray(causes)) {
      causes = [];
    }
    let index = this.state.index;
    index = index - 1;
    newItem.id = index;
    newItem.cau_id = index;
    this.setState({ index: index });
    causes.push(newItem);
    list.push(false);
    this.setState({list: list});
    this.props.onChange({
      target: {
        name: this.props.name,
        value: causes,
      },
    });
  }

  delOne(i) {
    let { causes } = this.props;
    causes.splice(i, 1);
    this.props.onChange({
      target: {
        name: this.props.name,
        value: causes,
      },
    });
  }

  onClose() {
    this.setState({ list: [] });
  }

  onHandleChange(event, i) {
    const { name, value } = event.target;
    let { causes } = this.props;
    if (name.indexOf('cause_type')>=0) {
      getCauseType(value).then(causeType => {
        causes[i]['cause_type'] = causeType;
        this.props.onChange({
          target: {
            name: this.props.name,
            value: causes,
          },
        });
      });
    } else {
      causes[i][name] = value;
      this.props.onChange({
        target: {
          name: this.props.name,
          value: causes,
        },
      });
    }
  }

  onFineChange(event, i) {
    if (this.state.source) {
      this.state.source.cancel();
    }
    const source = axios.CancelToken.source();
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    let { causes } = this.props;
    const search = '' + event.target.value;
    let newItem = {...causes[i]}
    newItem.value = search;
    newItem.cau_code = search;
    newItem.cau_name = search;
    causes[i] = newItem;
    this.setState({ display: search, loading: true, cancel: source });
    this.props.onChange({
      target: {
        name: this.props.name,
        value: causes,
      },
    });
    if (search.length >= 2) {
      freeAssoApi
        .get(process.env.REACT_APP_BO_URL + '/v1/asso/cause/autocomplete/' + search, {
          headers: headers,
          cancelToken: source.token,
        })
        .then(result => {
          let { list } = this.state;
          list[i] = result.data;
          this.setState({ list: list, loading: false });
        })
        .catch(err => {
          let { list } = this.state;
          list[i] = false;
          this.setState({ list: list, loading: false });
        });
    }
  }

  onChange(e, i) {
    let { causes } = this.props;
    let { list } = this.state;
    const id = e.target.value;
    if (id && parseInt(id, 10) > 0) {
      getCause(e.target.value).then(item => {
        causes[i] = item;
        list[i] = false;
        this.props.onChange({
          target: {
            name: this.props.name,
            value: causes,
          },
        });
        this.setState({ list: list });
      });
    } else {
      causes = causes.splice(i, 1);
      list[i] = false;
      this.props.onChange({
        target: {
          name: this.props.name,
          value: causes,
        },
      });
      this.setState({ list: list });
    }
  }

  render() {
    if (this.state.mouting) {
      return (
        <CenteredLoading3Dots />
      )
    }
    return (
      <div className="cause-list">
        {Array.isArray(this.props.causes) && this.props.causes.map((elem, i) => {
          return (
            <InputPickerEnhanced
              {...this.props}
              key={`cause-picker-${i}`}
              item={elem}
              label=""
              labelTop={false}
              labelSize={0}
              inputSize={36}
              multi
              list={this.state.list[i] || false}
              onHandleChange={e => {
                this.onHandleChange(e, i);
              }}
              onFineChange={e => {
                this.onFineChange(e, i);
              }}
              onChange={e => {
                this.onChange(e, i);
              }}
              onClose={this.onClose}
              onDelOne={e => {
                this.delOne(i);
              }}
              disabled={this.props.disabled}
            />
          );
        })}
        {!this.props.disabled &&
          <div className="col-xs-w9">
            <button className="btn btn-primary" onClick={this.addOne}>
              <AddOneIcon />
            </button>
          </div>
        }
      </div>
    );
  }
}

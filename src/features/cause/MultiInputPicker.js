import React, { Component } from 'react';
import { jsonApiNormalizer, buildModel } from 'freejsonapi';
import axios from 'axios';
import { freeAssoApi } from '../../common';
import { AddOne as AddOneIcon } from '../icons';
import { CenteredLoading3Dots } from '../ui';
import { InputPickerEnhanced, getCause } from './';

const _loadCause = id => {
  if (!id) {
    id = '0';
  }
  return freeAssoApi.get('/v1/asso/cause/' + id, {});
};

export default class MultiInputPicker extends Component {
  static propTypes = {};

  static getDerivedStateFromProps(props, state) {
    if (props.causes !== state.causes) {
      return { causes: props.causes || [] };
    }
    return null;
  }

  constructor(props) {
    super(props);
    let causes = [];
    try {
      causes = this.props.causes || [];
    } catch (ex) {}
    if (causes.length <= 0) {
      causes.push({ type: '', value: '' });
    }
    this.state = {
      list: [],
      causes: causes,
      autocomplete: false,
      source: false,
      emptyItem: {},
      loading: false,
      mouting: true,
    };
    this.onChange = this.onChange.bind(this);
    this.addOne = this.addOne.bind(this);
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
    let { causes } = this.state;
    causes.push({ type: '', id: '' });
    this.setState({ causes: causes });
  }

  onClose() {
    this.setState({ list: [] });
  }

  onFineChange(event, i) {
    if (this.state.source) {
      this.state.source.cancel();
    }
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      cancelToken: source.token,
    };
    let { causes } = this.state;
    const search = '' + event.target.value;
    const newItem = {...this.state.emptyItem};
    newItem.id = -1 * parseInt(i, 10);
    newItem.value = search;
    newItem.cau_code = search;
    causes[i] = newItem;
    this.setState({ causes: causes, display: search, loading: true, cancel: source });
    this.props.onChange({
      target: {
        name: this.props.name,
        value: JSON.stringify(causes),
      },
    });
    if (search.length >= 2) {
      axios
        .get(process.env.REACT_APP_BO_URL + '/v1/asso/cause/autocomplete/' + search, {
          headers: headers,
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
    let { causes, list } = this.state;
    const id = e.target.value;
    if (id && parseInt(id, 10) > 0) {
      _loadCause(e.target.value).then(result => {
        if (result && result.data) {
          const lines = jsonApiNormalizer(result.data);
          const item = buildModel(lines, 'FreeAsso_Cause', id, { eager: true });
          causes[i] = item;
          list[i] = false;
          this.props.onChange({
            target: {
              name: this.props.name,
              value: causes,
            },
          });
          this.setState({ causes: causes, list: list });
        }
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
      this.setState({ causes: causes, list: list });
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
        {this.state.causes.map((elem, i) => {
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
            />
          );
        })}
        <div className="col-9">
          <button className="btn btn-primary" onClick={this.addOne}>
            <AddOneIcon />
          </button>
        </div>
      </div>
    );
  }
}

import React, { Component } from 'react';
import { jsonApiNormalizer, buildModel } from 'freejsonapi';
import axios from 'axios';
import { freeAssoApi } from '../../common';
import { AddOne as AddOneIcon } from '../icons';
import { InputPicker } from './';

const _loadCause = id => {
  if (!id) {
    id = '0';
  }
  return freeAssoApi.get('/v1/asso/cause/' + id, {});
};

export default class MultiInputPicker extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    let causes = [];
    try {
      causes = JSON.parse(this.props.value || []);
    } catch (ex) {}
    if (causes.length <= 0) {
      causes.push({ type: '', value: '' });
    }
    this.state = {
      list: [],
      causes: causes,
      autocomplete: false,
      source: false,
      loading: false,
    };
    this.onChange = this.onChange.bind(this);
    this.addOne = this.addOne.bind(this);
    this.onFineChange = this.onFineChange.bind(this);
  }

  addOne() {
    let { causes } = this.state;
    causes.push({ type: '', id: '' });
    this.setState({ causes: causes });
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
    causes[i] = {
      id: search,
      value: search,
      type: ''
    };
    this.setState({ causes: causes, display: search, loading: true, cancel: source });
    this.props.onChange(
      {
        target: {
          name: this.props.name,
          value: JSON.stringify(causes),
        }
      }
    );
    if (search.length >= 2) {
      axios
        .get(process.env.REACT_APP_BO_URL + '/v1/asso/cause/autocomplete/' + event.target.value, {
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
    let { causes } = this.state;
    const id = e.target.value;
    _loadCause(e.target.value).then(result => {
      if (result && result.data) {
        const lines = jsonApiNormalizer(result.data);
        const item = buildModel(lines, 'FreeAsso_Cause', id, { eager: true });
        causes[i] = item;
        let { list } = this.state;
        list[i] = false;
        this.props.onChange(
          {
            target: {
              name: this.props.name,
              value: JSON.stringify(causes),
            }
          }
        );
        this.setState({ causes: causes, list: list });
      }
    });
  }

  render() {
    return (
      <div className="row">
        {this.state.causes.map((elem, i) => {
          return (
            <div className="col-9" key={`cause-picker-${i}`}>
              <InputPicker
                {...this.props}
                item={elem}
                label=""
                labelTop={false}
                labelSize={0}
                inputSize={36}
                list={this.state.list[i] || false}
                onFineChange={e => {
                  this.onFineChange(e, i);
                }}
                onChange={e => {
                  this.onChange(e, i);
                }}
              />
            </div>
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

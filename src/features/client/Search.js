import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ModalResponsive, LoadingData } from '../layout';
import { freeAssoApi, jsonApiNormalizer, buildModel } from '../../common';

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
  }

  componentDidMount() {
    if (!this.state.loading) {
      const doRequest = freeAssoApi.get('/v1/asso/client', {});
      this.setState({ loading: true, finish: false, list: [] });
      doRequest.then(
        result => {
          let items = [];
          if (result && result.data) {
            const lines = jsonApiNormalizer(result.data);
            items = buildModel(lines, 'FreeAsso_Client');
          }
          this.setState({ loading: false, finish: true, list: items });
        }
      );
    }
  }

  render() {
    return (
      <ModalResponsive title={this.props.title} show={this.props.show} onClose={this.props.onClose}>
        {this.state.loading ? (
          <LoadingData />
        ) : (
          <div>
            <ul className="list-group">
            {this.state.list && this.state.list.map((item) => {
              return (
                <li className="list-item">
                  <p>{item.cli_lastname}</p>
                </li>
              )
            })}
            </ul>
          </div>
        )}
      </ModalResponsive>
    );
  }
}

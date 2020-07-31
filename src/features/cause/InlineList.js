import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { freeAssoApi } from '../../common';
import { jsonApiNormalizer, objectToQueryString, normalizedObjectModeler } from 'freejsonapi';
import {CenteredLoading3Dots } from '../ui';
import { InlineListGroup } from '.';
import { causeGroup } from './functions.js';

export default class InlineList extends Component {
  static propTypes = {
    site_id: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      site_id: this.props.site_id,
      list: [],
      loading: false,
    };
  }

  componentDidMount() {
    if (!this.state.loading) {
      this.setState({ loading: true });
      const params = { filter: { site_id: this.props.site_id } };
      const addUrl = objectToQueryString(params);
      const doRequest = freeAssoApi.get('/v1/asso/cause' + addUrl, {});
      doRequest
        .then(result => {
          const lines = jsonApiNormalizer(result.data);
          const items = normalizedObjectModeler(lines, 'FreeAsso_Cause');
          this.setState({ loading: false, list: items });
        })
        .catch(err => {
          this.setState({ loading: false, list: [] });
        });
    }
  }

  render() {
    return (
      <div className="cause-inline-list">
        {this.state.loading ? (
          <CenteredLoading3Dots />
        ) : (
          <InlineListGroup list={causeGroup(this.state.list)}/>
        )}
      </div>
    );
  }
}

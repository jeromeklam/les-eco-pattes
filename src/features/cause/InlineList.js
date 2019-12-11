import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { freeAssoApi, jsonApiNormalizer, objectToQueryString, buildModel } from '../../common';
import { InlineLoader } from '../layout';
import { SimpleLabel as DataSimpleLabel } from '../data';

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
          const items = buildModel(lines, 'FreeAsso_Cause');
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
          <InlineLoader />
        ) : (
          <div>
            {this.state.list &&
              this.state.list.map(item => {
                return (
                  <p key={item.id} title={item.cau_name}>{item.cause_type.caut_name}
                    &nbsp;( {item.cau_sex} )
                    &nbsp;( <DataSimpleLabel code="COULEUR" value={item.cau_string_1} /> )
                  </p>
                );
              })}
          </div>
        )}
      </div>
    );
  }
}

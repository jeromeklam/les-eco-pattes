import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { withRouter } from 'react-router-dom';
import { getJsonApi } from 'freejsonapi';
import { propagateModel } from '../../common';
import { CenteredLoading9X9, modifySuccess, modifyError } from '../ui';
import Form from './Form';

/**
 * Modification d'un type de site
 */
export class Modify extends Component {
  static propTypes = {
    siteType: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      siteTypeId: this.props.match.params.id || false,
      item: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadOne(this.state.siteTypeId).then(result => {
      const item = this.props.siteType.loadOneItem;
      this.setState({ item: item });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.siteTypeId && this.props.match.params.siteTypeId) {
      if (prevProps.match.params.siteTypeId !== this.props.match.params.siteTypeId) {
        this.setState({ siteTypeId: this.props.match.params.siteTypeId });
        this.props.actions.loadOne(this.props.match.params.siteTypeId).then(result => {
          const item = this.props.siteType.loadOneItem;
          this.setState({ item: item });
        });
      }
    }
  }

  onCancel() {
    this.props.history.push('/site-type');
  }

  onSubmit(datas = {}) {
    let obj = getJsonApi(datas);
    this.props.actions
      .updateOne(obj)
      .then(result => {
        modifySuccess();
        this.props.actions.propagateModel('FreeAsso_SiteType', result);
        this.props.history.push('/site-type');
      })
      .catch(errors => {
        modifyError();
      });
  }

  render() {
    const item = this.state.item;
    return (
      <div className="site-type-modify global-card">
        {this.props.siteType.loadOnePending ? (
          <CenteredLoading9X9 />
        ) : (
          <div>
            {item && 
              <Form 
                item={item} 
                datas={this.props.data.items}
                config={this.props.config.items}
                properties={this.props.siteType.properties}
                onSubmit={this.onSubmit}
                onCancel={this.onCancel}
              />
            }
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    siteType: state.siteType,
    data: state.data,
    config: state.config,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Modify));

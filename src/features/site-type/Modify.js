import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { getJsonApi, propagateModel } from '../../common';
import Form from './Form';
import {
  withRouter
} from 'react-router-dom'

export class Modify extends Component {
  static propTypes = {
    siteType: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      siteTypeId: this.props.match.params.siteTypeId || false,
      item: false,
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }    

  componentDidMount() {
    this.props.actions.loadOne(this.state.siteTypeId).then(result => {
      const item = this.props.siteType.loadOneItem;
      this.setState({ item: item });
    });
  }

  onChange(event) {
    if (event) {
      event.preventDefault();
    }
    if (event && event.target) {
      const value = event.target.value;
      let item = this.state.item;
      item[event.target.name] = value;
      this.setState({ item: item });
    }
  }

  onCancel(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.history.push('/site-type')
  }

  onSubmit(event) {
    if (event) {
      event.preventDefault();
    }
    let error = false;
    if (!error) {
      let obj = getJsonApi(this.state.item, 'FreeAsso_SiteType', this.state.siteTypeId);
      this.props.actions.updateOne(this.state.siteTypeId, obj)
        .then(result => {
          this.props.actions.propagateModel('FreeAsso_SiteType', result);
          this.props.history.push('/site-type')
        })
        .catch((errors) => {
          console.log(errors);
        })
      ;
    }
  }

  render() {
    const item = this.state.item;
    return (      
      <div className="site-type-modify">
        {item && (
          <Form 
            item={this.props.siteType.loadOneItem}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            onCancel={this.onCancel}
          />
        )}         
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    siteType: state.siteType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions,propagateModel }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Modify));

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class SimpleLabel extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    let string = '';
    this.props.data.models.forEach(item => {
      if (item.data_code === this.props.code) {
        const datas = JSON.parse(item.data_content);
        datas.forEach(item => {
          if (item.value === this.props.value) {
            string = item.label;
            return false;
          }
        });
      }
    });
    return <span>{string}</span>;
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    data: state.data,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SimpleLabel);

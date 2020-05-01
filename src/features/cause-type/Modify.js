import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { withRouter } from 'react-router-dom';
import { getJsonApi } from 'freejsonapi';
import { propagateModel, modelsToSelect } from '../../common';
import { CenteredLoading3Dots, modifyError, modifySuccess } from '../ui';
import Form from './Form';

export class Modify extends Component {
  static propTypes = {
    causeType: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    loader: PropTypes.bool,
  };
  static defaultProps = {
    loader: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.cautId || this.props.match.params.id || false,
      item: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadOne(this.state.id).then(result => {
      const item = this.props.causeType.loadOneItem;
      this.setState({ item: item });
    }); 
  }

  onCancel() {
    this.props.onClose();
  }

  onSubmit(datas = {}) {
    let obj = getJsonApi(datas, 'FreeAsso_CauseType', this.state.id);
    this.props.actions
      .updateOne(this.state.id, obj)
      .then(result => {
        modifySuccess();
        this.props.actions.propagateModel('FreeAsso_CauseType', result);
        this.props.onClose();
      })
      .catch(errors => {
        modifyError();
     });
  }

  render() {
    const item = this.state.item;
    const options = modelsToSelect(this.props.causeMainType.items, 'id', 'camt_name');
    return (
      <div className="cause-type-modify global-card">
        {!item ? (
          <CenteredLoading3Dots show={this.props.loader} />
        ) : (
          <div>
            {item && 
              <Form 
                item={item} 
                causeMainType={options} 
                errors={this.props.causeType.updateOneError}
                onSubmit={this.onSubmit} 
                onCancel={this.onCancel} 
                onClose={this.props.onClose}
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
    causeType: state.causeType,
    causeMainType: state.causeMainType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Modify));

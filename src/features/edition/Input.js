import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import * as actions from './redux/actions';
import { getJsonApi } from 'jsonapi-front';
import { propagateModel, modelsToSelect } from '../../common';
import { CenteredLoading3Dots, createSuccess, modifySuccess, showErrors } from '../ui';
import Form from './Form';

export class Input extends Component {
  static propTypes = {
    edition: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      ediId: this.props.ediId || 0,
      item: false,
      emptyVersion: null,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentDidMount() {
    const promise1 = this.props.actions.loadOne(this.state.ediId);
    const promise2 = this.props.actions.loadOneVersion(0);
    Promise.all([promise1, promise2]).then(result => {
      this.setState({
        item: this.props.edition.loadOneItem,
        emptyVersion: this.props.edition.emptyVersion,
      });
    });
  }

  onCancel(event) {
    this.props.onClose();
  }

  /**
   * Sur enregistrement, sauvegarde, update store et retour à la liste
   */
  onSubmit(datas = {}) {
    // Conversion des données en objet pour le service web
    let obj = getJsonApi(datas, 'FreeFW_Edition');
    if (this.state.ediId > 0) {
      this.props.actions
        .updateOne(this.state.ediId, obj)
        .then(result => {
          modifySuccess();
          this.props.actions.propagateModel('FreeFW_Edition', result);
          this.props.onClose();
        })
        .catch(errors => {
          showErrors(this.props.intl, errors, 'updateOneError');
        });
    } else {
      this.props.actions
        .createOne(obj)
        .then(result => {
          createSuccess();
          this.props.actions.propagateModel('FreeFW_Edition', result);
          this.props.onClose();
        })
        .catch(errors => {
          showErrors(this.props.intl, errors, 'createOneError');
        });
    }
  }

  render() {
    const item = this.state.item;
    const options = modelsToSelect(this.props.lang.items, 'id', 'lang_name');
    return (
      <div className="edition-input global-card">
        {!item ? (
          <CenteredLoading3Dots show={this.props.loader} />
        ) : (
          <div>
            {item && (
              <Form
                item={item}
                emptyVersion={this.state.emptyVersion}
                langs={options}
                modify={true}
                errors={
                  this.state.ediId > 0
                    ? this.props.edition.updateOneError
                    : this.props.edition.createOneError
                }
                onSubmit={this.onSubmit}
                onCancel={this.onCancel}
                onClose={this.props.onClose}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    edition: state.edition,
    lang: state.lang,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Input));

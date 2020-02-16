import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ResponsiveConfirm } from 'freeassofront';
import { getJsonApi } from 'freejsonapi';
import * as actions from './redux/actions';
import { propagateModel, intlDate } from '../../common';
import { DelOne as DelOneIcon } from '../icons';
import { CenteredLoading3Dots, createSuccess, createError } from '../ui';
import { InlineSicknessForm, getWhereLabel, getCareLabel } from './';

export class InlineSicknesses extends Component {
  static propTypes = {
    causeSickness: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.cause !== state.cause) {
      return { cause: props.cause, caus_id: 0, confirm: false };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      confirm: false,
      caus_id: 0,
      cause: props.cause,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onConfirmOpen = this.onConfirmOpen.bind(this);
    this.onConfirmClose = this.onConfirmClose.bind(this);
  }

  componentDidMount() {
    if (!this.props.causeSickness.emptyItem) {
      this.props.actions.loadOne(0);
    }
  }

  onSubmit(datas = {}) {
    // Conversion des données en objet pour le service web
    const { cause } = this.state;
    datas.cause = cause;
    console.log(datas, cause);
    const obj = getJsonApi(datas, 'FreeAsso_CauseSickness');
    this.props.actions
      .createOne(obj)
      .then(result => {
        createSuccess();
        this.props.actions.propagateModel('FreeAsso_CauseSickness', result);
        this.props.actions.loadSicknesses(cause);
      })
      .catch(errors => {
        // @todo display errors to fields
        createError();
      });
  }

  onConfirmOpen(id) {
    this.setState({ confirm: true, caus_id: id });
  }

  onConfirm(id) {
    const { caus_id, cause } = this.state;
    this.setState({ confirm: false, caus_id: 0 });
    this.props.actions.delOne(caus_id).then(result => {
      this.props.actions.loadSicknesses(cause);
    });
  }

  onConfirmClose() {
    this.setState({ confirm: false, caus_id: 0 });
  }

  render() {
    const sicknesses = this.props.causeSickness.sicknessesModels;
    const emptyItem = this.props.causeSickness.emptyItem;
    if (this.props.causeSickness.loadSicknessesPending) {
      return (
        <div className="cause-inline-sicknesses">
          <CenteredLoading3Dots className="text-light" />
        </div>
      );
    } else {
      return (
        <div className="cause-inline-sicknesses">
          <div className="inline-list">
            <div className="row row-line row-title" key="cause-inline-sicknesses">
              <div className="col-6">
                <span>Du</span>
              </div>
              <div className="col-6">
                <span>Au</span>
              </div>
              <div className="col-6">
                <span>Lieu</span>
              </div>
              <div className="col-6">
                <span>Soins</span>
              </div>
              <div className="col-8">
                <span>Maladie</span>
              </div>
              <div className="col-4">
                <span></span>
              </div>
            </div>
            {emptyItem && (
              <InlineSicknessForm
                cause={this.state.cause}
                item={emptyItem}
                errors={this.props.causeSickness.createOneError}
                onSubmit={this.onSubmit}
              />
            )}
            {sicknesses &&
              sicknesses.length > 0 &&
              sicknesses.map(sickness => (
                <div className="row row-line" key={sickness.id}>
                  <div className="col-6">{intlDate(sickness.caus_from)}</div>
                  <div className="col-6">{intlDate(sickness.caus_to)}</div>
                  <div className="col-6">{getWhereLabel(sickness.caus_where)}</div>
                  <div className="col-6">{getCareLabel(sickness.caus_care)}</div>
                  <div className="col-8">{sickness.sickness && sickness.sickness.sick_name}</div>
                  <div className="col-4">
                    <div className="btn-group btn-group-sm" role="group" aria-label="...">
                      <div className="btn-group" role="group" aria-label="First group">
                        <div className="ml-2">
                          <DelOneIcon
                            onClick={() => this.onConfirmOpen(sickness.id)}
                            className="text-warning inline-action"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            <ResponsiveConfirm
              show={this.state.confirm}
              onClose={this.onConfirmClose}
              onConfirm={() => {
                this.onConfirm();
              }}
            />
          </div>
        </div>
      );
    }
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    causeSickness: state.causeSickness,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InlineSicknesses);

import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { buildModel, getJsonApi } from 'freejsonapi';
import * as actions from './redux/actions';
import { ResponsiveConfirm } from 'freeassofront';
import { CenteredLoading3Dots, createSuccess, createError } from '../ui';
import { InlineMovementForm } from './';
import { propagateModel, intlDate } from '../../common';
import { DelOne as DelOneIcon, SimpleValid as SimpleValidIcon } from '../icons';
import { statusLabel } from './';

export class InlineMovements extends Component {
  static propTypes = {
    causeMovement: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.cause !== state.cause) {
      return { cause: props.cause, camv_id: 0, confirm: false };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      confirm: false,
      valid: false,
      camv_id: 0,
      cause: props.cause,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onConfirmMovement = this.onConfirmMovement.bind(this);
    this.onConfirmValidation = this.onConfirmValidation.bind(this);
    this.onConfirmClose = this.onConfirmClose.bind(this);
    this.onValid = this.onValid.bind(this);
  }

  componentDidMount() {
    if (!this.props.causeMovement.emptyItem) {
      this.props.actions.loadOne(0);
    }
  }

  onSubmit(datas = {}) {
    // Conversion des données en objet pour le service web
    const obj = getJsonApi(datas, 'FreeAsso_CauseMovement');
    const { cause } = this.state;
    this.props.actions
      .createOne(obj)
      .then(result => {
        createSuccess();
        this.props.actions.propagateModel('FreeAsso_CauseMovement', result);
        this.props.actions.loadMovements(cause);
      })
      .catch(errors => {
        // @todo display errors to fields
        createError();
      });
  }

  onConfirmMovement(id) {
    this.setState({ confirm: !this.state.confirm, camv_id: id });
  }

  onConfirmValidation(id) {
    this.setState({ valid: !this.state.valid, camv_id: id });
  }

  onValid() {
    const { camv_id, cause } = this.state;
    this.setState({ valid: false, camv_id: null });
    this.props.actions.validateOne(camv_id).then(result => {
      this.props.actions.propagateModel('FreeAsso_CauseMovement', result);
      this.props.actions.loadMovements(cause);
    });
  }

  onConfirm() {
    const { camv_id, cause } = this.state;
    this.setState({ confirm: false, camv_id: 0 });
    this.props.actions.delOne(camv_id).then(result => {
      this.props.actions.loadMovements(cause);
    });
  }

  onConfirmClose() {
    this.setState({ valid: false, confirm: false, camv_id: 0, cause_movement: null });
  }

  render() {
    let counter = 0;
    const { confirm, valid } = this.state;
    let movements = [];
    if (this.props.causeMovement.movements.FreeAsso_CauseMovement) {
      movements = buildModel(this.props.causeMovement.movements, 'FreeAsso_CauseMovement');
    }
    const { emptyItem } = this.props.causeMovement;
    if (this.props.causeMovement.loadMovementsPending) {
      return (
        <div className="cause-inline-mevements">
          <CenteredLoading3Dots className="text-light" />
        </div>
      );
    } else {
      if (movements && movements.length > 0) {
        return (
          <div className="cause-inline-movements">
            <div className="inline-list">
              <div className={classnames('row row-title row-line', (counter++ % 2 !== 1) ? 'row-odd' : 'row-even')} key="cause-inline-movements">
                <div className="col-5">
                  <span>Date</span>
                </div>
                <div className="col-7">
                  <span>Depuis</span>
                </div>
                <div className="col-7">
                  <span>Vers</span>
                </div>
                <div className="col-7">
                  <span>Notes</span>
                </div>
                <div className="col-10">
                  <span>Status</span>
                </div>
              </div>
              {movements.map(movement => {
                return (
                  <div className={classnames('row row-line', (counter++ % 2 !== 1) ? 'row-odd' : 'row-even')} key={movement.id}>
                    <div className="col-5">{intlDate(movement.camv_to)}</div>
                    <div className="col-7">{movement.from_site.site_name}</div>
                    <div className="col-7">{movement.to_site.site_name}</div>
                    <div className="col-7">{movement.camv_comment}</div>
                    <div className="col-5">{statusLabel(movement.camv_status)}</div>
                    <div className="col-5 text-right">
                      <div className="btn-group btn-group-sm" role="group" aria-label="...">
                        {movement.camv_status === 'WAIT' && (
                          <div className="btn btn-inline btn-primary">
                            <SimpleValidIcon
                              onClick={() => this.onConfirmValidation(movement.id)}
                              className="text-light inline-action"
                            />
                          </div>
                        )}
                        <div className="btn btn-inline btn-warning">
                          <DelOneIcon
                            onClick={() => this.onConfirmMovement(movement.id)}
                            className="text-light inline-action"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <ResponsiveConfirm
                show={confirm}
                onClose={this.onConfirmClose}
                onConfirm={() => {
                  this.onConfirm();
                }}
              />
              <ResponsiveConfirm
                show={valid}
                onClose={this.onConfirmClose}
                onConfirm={() => {
                  this.onValid();
                }}
              >
                <p>Confirmez-vous la validation du mouvement ?</p>
              </ResponsiveConfirm>
            </div>
            <div className="row row-new">
              <div className="col-36 pt-2">
                {emptyItem && (
                  <InlineMovementForm
                    cause={this.state.cause}
                    item={emptyItem}
                    errors={this.props.causeMovement.createOneError}
                    onSubmit={this.onSubmit}
                  />
                )}
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="cause-inline-movements">
            <div className="row row-new">
              <div className="col-36 pt-2">
                {emptyItem && (
                  <InlineMovementForm
                    cause={this.props.causeMovement.cause}
                    item={emptyItem}
                    errors={this.props.causeMovement.createOneError}
                    onSubmit={this.onSubmit}
                  />
                )}
              </div>
            </div>
          </div>
        );
      }
    }
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    causeMovement: state.causeMovement,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InlineMovements);

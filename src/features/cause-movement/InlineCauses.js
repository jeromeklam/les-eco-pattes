import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getJsonApi } from 'freejsonapi';
import * as actions from './redux/actions';
import { ResponsiveConfirm, HoverObserver } from 'freeassofront';
import { CenteredLoading3Dots, createSuccess, createError } from '../ui';
import { InlineCauseForm } from './';
import { propagateModel } from '../../common';
import { getCauseTypeLabel } from '../cause-type';
import { getSexlabel } from '../cause';
import { DelOne as DelOneIcon, SimpleCheck as SimpleCheckIcon } from '../icons';
import { statusLabel, getMovements } from './';

export class InlineCauses extends Component {
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
      movement: props.movement,
      emptyItem: null,
      items: [],
      loading: true,
      flipped: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onConfirmMovement = this.onConfirmMovement.bind(this);
    this.onConfirmValidation = this.onConfirmValidation.bind(this);
    this.onConfirmClose = this.onConfirmClose.bind(this);
    this.localLoadMovements = this.localLoadMovements.bind(this);
    this.onValid = this.onValid.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
  }

  localLoadMovements() {
    let cauId = null;
    let moveId = null;
    if (this.state.cause) {
      cauId = this.state.cause.id;
    }
    if (this.state.movement) {
      moveId = this.state.movement.id;
    }
    this.setState({ loading: true });
    getMovements(cauId, moveId).then(result => {
      this.setState({ loading: false, items: result });
    });
  }

  componentDidMount() {
    this.localLoadMovements();
    if (!this.state.emptyItem) {
      this.props.actions.loadOne(0).then(result => {
         this.setState({emptyItem: this.props.causeMovement.emptyItem});
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.movement !== this.state.movement) {
      this.localLoadMovements();
    }
  }

  onSubmit(datas = {}) {
    // Conversion des données en objet pour le service web
    const { movement } = this.state;
    datas.movement = movement;
    datas.camv_start = movement.move_from;
    datas.camv_to = movement.move_to;
    datas.from_site = movement.from_site;
    datas.to_site = movement.to_site;
    const obj = getJsonApi(datas, 'FreeAsso_CauseMovement');
    this.props.actions
      .createOne(obj)
      .then(result => {
        createSuccess();
        this.props.actions.propagateModel('FreeAsso_CauseMovement', result);
        this.localLoadMovements();
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
      this.localLoadMovements();
    });
  }

  onConfirm() {
    const { camv_id, cause } = this.state;
    this.setState({ confirm: false, camv_id: 0 });
    this.props.actions.delOne(camv_id).then(result => {
      this.localLoadMovements();
    });
  }

  onConfirmClose() {
    this.setState({ valid: false, confirm: false, camv_id: 0, cause_movement: null });
  }

  mouseLeave() {
    this.setState({ flipped: false });
  }

  mouseEnter(id) {
    this.setState({ flipped: id });
  }

  render() {
    let counter = 0;
    const { confirm, valid } = this.state;
    let movements = this.state.items;
    const { emptyItem } = this.state;
    if (this.state.loading) {
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
                <div className="col-sm-5 col-first">
                  <span>N° boucle</span>
                </div>
                <div className="col-sm-7">
                  <span>Race</span>
                </div>
                <div className="col-sm-7">
                  <span>Sexe</span>
                </div>
                <div className="col-sm-7">
                  <span>Notes</span>
                </div>
                <div className="col-sm-10">
                  <span>Status</span>
                </div>
              </div>
              {movements.map(movement => {
                return (
                  <HoverObserver onMouseEnter={() => {this.mouseEnter(movement.id)}} onMouseLeave={this.mouseLeave}>
                    <div className={classnames('row row-line', (counter++ % 2 !== 1) ? 'row-odd' : 'row-even')} key={movement.id}>
                      <div className="col-sm-5 col-first">{movement.cause.cau_code}</div>
                      <div className="col-sm-7">{getCauseTypeLabel(this.props.causeType.items, movement.cause.cause_type.id)}</div>
                      <div className="col-sm-7">{getSexlabel(movement.cause.cau_sex)}</div>
                      <div className="col-sm-7">{movement.camv_comment}</div>
                      <div className="col-sm-5">{statusLabel(movement.camv_status)}</div>
                      <div className="col-sm-5 text-right col-last">
                      {this.state.flipped && this.state.flipped === movement.id && 
                        <div className="btn-group btn-group-sm" role="group" aria-label="...">
                          {movement.camv_status === 'WAIT' && (
                            <div className="btn btn-inline btn-primary">
                              <SimpleCheckIcon
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
                      }
                      </div>
                    </div>
                  </HoverObserver>
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
                theme="success"
                onClose={this.onConfirmClose}
                onConfirm={() => {
                  this.onValid();
                }}
              >
                <p>Confirmez-vous la validation du mouvement ?</p>
              </ResponsiveConfirm>
            </div>
            <div className="row row-new-movement">
              <div className="col-36 p-3">
                {emptyItem && (
                  <InlineCauseForm
                    movement={this.state.movement}
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
            <div className="row row-new-movement">
              <div className="col-36 pt-2">
                {emptyItem && (
                  <InlineCauseForm
                    movement={this.props.causeMovement.movement}
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

function mapStateToProps(state) {
  return {
    causeMovement: state.causeMovement,
    causeType: state.causeType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InlineCauses);

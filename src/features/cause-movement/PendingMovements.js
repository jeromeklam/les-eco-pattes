import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { buildModel } from 'freejsonapi';
import { ResponsiveConfirm, Loading3Dots } from 'freeassofront';
import { propagateModel, intlDate } from '../../common';
import {
  DelOne as DelOneIcon,
  SimpleValid as SimpleValidIcon,
  Movement as MovementIcon,
} from '../icons';
import { statusLabel } from './';
import { StatCard } from '../ui';

export class PendingMovements extends Component {
  static propTypes = {
    causeMovement: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      confirm: false,
      valid: false,
      camv_id: 0,
    };
    this.onConfirm = this.onConfirm.bind(this);
    this.onConfirmMovement = this.onConfirmMovement.bind(this);
    this.onConfirmValidation = this.onConfirmValidation.bind(this);
    this.onConfirmClose = this.onConfirmClose.bind(this);
    this.onValid = this.onValid.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadPendings();
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
    const { confirm, valid } = this.state;
    let movements = [];
    if (this.props.causeMovement.pendings.FreeAsso_CauseMovement) {
      movements = buildModel(this.props.causeMovement.pendings, 'FreeAsso_CauseMovement');
    }
    return (
      <StatCard title="Mouvements en attente" icon={<MovementIcon />} size="md">
        <div>
          <div className="cause-movement-pendings text-secondary bg-secondary-light">
            {movements && movements.length > 0 ? (
              <div className="inline-list">
                <div className="row row-title">
                  <div className="col-lg-12">
                    <span>Pour le</span>
                  </div>
                  <div className="col-lg-12">
                    <span>Animal</span>
                  </div>
                  <div className="col-lg-12">
                    <span>Status</span>
                  </div>
                  <div className="col-lg-12">
                    <span>Depuis</span>
                  </div>
                  <div className="col-lg-12">
                    <span>Vers</span>
                  </div>
                  <div className="col-lg-12">
                    <span>Notes</span>
                  </div>
                </div>
                {movements.map(movement => {
                  return (
                    <div className="row row-line" key={`pending-${movement.id}`}>
                      <div className="col-12">{intlDate(movement.camv_to)}</div>
                      <div className="col-12">{movement.cause.cau_code}</div>
                      <div className="col-12">{statusLabel(movement.camv_status)}</div>
                      <div className="col-12">{movement.from_site.site_name}</div>
                      <div className="col-12">{movement.to_site.site_name}</div>
                      <div className="col-12">{movement.camv_comment}</div>
                      <div className="col-36 text-right">
                        <div className="btn-group btn-group-sm" role="group" aria-label="...">
                          <div className="btn-group" role="group" aria-label="First group">
                            <div className="ml-2">
                              {movement.camv_status === 'WAIT' && (
                                <SimpleValidIcon
                                  onClick={() => this.onConfirmValidation(movement.id)}
                                  className="text-primary inline-action"
                                />
                              )}
                              <DelOneIcon
                                onClick={() => this.onConfirmMovement(movement.id)}
                                className="text-warning inline-action"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div><span className="p-3">Aucun mouvement en attente</span></div>
            )}
            {this.props.causeMovement.loadPendingsPending && 
            <div className="inline-list">
              <div className="row row-line">
                <div className="col-36 text-center">
                  <Loading3Dots />
                </div>
              </div>
            </div>
            }
          </div>
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
      </StatCard>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(PendingMovements);

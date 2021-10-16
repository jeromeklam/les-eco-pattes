import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import * as actions from './redux/actions';
import { normalizedObjectModeler } from 'jsonapi-front';
import { HoverObserver, ResponsiveConfirm } from 'react-bootstrap-front';
import { intlDateTime, propagateModel } from '../../common';
import {
  GetOne as GetOneIcon,
  Movement as MovementIcon,
  SimpleCheck as SimpleCheckIcon,
} from '../icons';
import {
  CenteredLoading3Dots,
  InlineList,
  Line,
  Col,
  validateSuccess,
  validateError,
  showErrors,
} from '../ui';
import { DashboardCard } from '../dashboard';
import { statusLabel } from '../cause-movement';
import { Input } from './';

export class PendingMovements extends Component {
  static propTypes = {
    movement: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      confirm: false,
      valid: false,
      flipped: false,
      move_id: 0,
    };
    this.onGetOne = this.onGetOne.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onGetOne = this.onGetOne.bind(this);
    this.onValid = this.onValid.bind(this);
    this.onConfirmValidation = this.onConfirmValidation.bind(this);
    this.onConfirmClose = this.onConfirmClose.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadPendings();
  }

  onClose(id) {
    this.setState({ move_id: -1 });
    this.props.actions.loadPendings();
  }

  onGetOne(id) {
    this.setState({ move_id: id });
  }

  onValid() {
    const { move_id } = this.state;
    this.setState({ valid: false, move_id: null });
    this.props.actions
      .validateOne(move_id)
      .then(result => {
        validateSuccess();
        this.props.actions.propagateModel('FreeAsso_Movement', result);
        this.props.actions.loadPendings();
      })
      .catch(errors => {
        validateError();
        showErrors(this.props.intl, errors, 'validOneError');
      });
  }

  onConfirmValidation(id) {
    this.setState({ valid: true, move_id: id });
  }

  onConfirmClose() {
    this.setState({ valid: false, move_id: -1 });
  }

  mouseLeave() {
    this.setState({ flipped: false });
  }

  mouseEnter(id) {
    this.setState({ flipped: id });
  }

  render() {
    let counter = 1;
    let movements = [];
    if (this.props.movement.pendings && this.props.movement.pendings.FreeAsso_Movement) {
      movements = normalizedObjectModeler(this.props.movement.pendings, 'FreeAsso_Movement');
    }
    const header = (
      <InlineList>
        <Line header>
          <Col size={{ xs: 6 }}>
            <span>Date</span>
          </Col>
          <Col size={{ xs: 10 }}>
            <span>Depuis</span>
          </Col>
          <Col size={{ xs: 10 }}>
            <span>Vers</span>
          </Col>
          <Col size={{ xs: 4 }}>
            <span>Statut</span>
          </Col>
          <Col size={{ xs: 6 }}></Col>
        </Line>
      </InlineList>
    );
    return (
      <DashboardCard
        title="Mouvements en attente"
        icon={<MovementIcon />}
        size="md"
        header={header}
        overlay={this.props.overlay}
      >
        <div className="movement-pending-movements">
          <div className="movement-pendings text-secondarys">
            {movements && movements.length > 0 ? (
              <InlineList>
                {movements.map(movement => {
                  return (
                    <HoverObserver
                      key={`pending-${movement.id}`}
                      onMouseEnter={() => {
                        this.mouseEnter(movement.id);
                      }}
                      onMouseLeave={this.mouseLeave}
                    >
                      <Line oddEven={counter++}>
                        <Col size={{ xs: 6 }}>{intlDateTime(movement.move_to, true)}</Col>
                        <Col size={{ xs: 10 }}>{movement.from_site.site_name}</Col>
                        <Col size={{ xs: 10 }}>{movement.to_site.site_name}</Col>
                        <Col size={{ xs: 4 }}>{statusLabel(movement.move_status)}</Col>
                        <Col size={{ xs: 6 }}>
                          {this.state.flipped && this.state.flipped === movement.id && (
                            <div
                              className="btn-group btn-group-sm float-right"
                              role="group"
                              aria-label="..."
                            >
                              <button
                                type="button"
                                className="btn btn-inline btn-primary"
                                onClick={() => this.onConfirmValidation(movement.id)}
                              >
                                <SimpleCheckIcon className="text-light inline-action" />
                              </button>
                              <button
                                type="button"
                                className="btn btn-inline btn-secondary"
                                onClick={() => this.onGetOne(movement.id)}
                              >
                                <GetOneIcon className="text-light inline-action" />
                              </button>
                            </div>
                          )}
                        </Col>
                      </Line>
                    </HoverObserver>
                  );
                })}
              </InlineList>
            ) : (
              <div>
                <span className="p-3">Aucun mouvement en attente</span>
              </div>
            )}
            {this.props.movement.loadPendingsPending && (
              <div className="inline-list">
                <div className="row row-line">
                  <div className="col-xs-w36 text-center">
                    <CenteredLoading3Dots />
                  </div>
                </div>
              </div>
            )}
          </div>
          {parseInt(this.state.move_id, 10) > 0 &&
            (this.state.valid ? (
              <ResponsiveConfirm
                show={this.state.valid}
                theme="success"
                onClose={this.onConfirmClose}
                onConfirm={() => {
                  this.onValid();
                }}
              >
                <p>Confirmez-vous la validation du mouvement ?</p>
              </ResponsiveConfirm>
            ) : (
              <Input move_id={this.state.move_id} loader={false} onClose={this.onClose} />
            ))}
        </div>
      </DashboardCard>
    );
  }
}

function mapStateToProps(state) {
  return {
    movement: state.movement,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(PendingMovements));

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { normalizedObjectModeler } from 'jsonapi-tools';
import { ResponsiveConfirm, HoverObserver } from 'react-bootstrap-front';
import { propagateModel, intlDateTime } from '../../common';
import {
  DelOne as DelOneIcon,
  SimpleCheck as SimpleValidIcon,
  Movement as MovementIcon,
} from '../icons';
import { CenteredLoading3Dots, InlineList, Line, Col } from '../ui';
import { DashboardCard } from '../dashboard';
import { statusLabel } from './';

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
      flipped: false,
    };
    this.onConfirm = this.onConfirm.bind(this);
    this.onConfirmMovement = this.onConfirmMovement.bind(this);
    this.onConfirmValidation = this.onConfirmValidation.bind(this);
    this.onConfirmClose = this.onConfirmClose.bind(this);
    this.onValid = this.onValid.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
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
    const { camv_id } = this.state;
    this.setState({ valid: false, camv_id: null });
    this.props.actions.validateOne(camv_id).then(result => {
      this.props.actions.propagateModel('FreeAsso_CauseMovement', result);
      this.props.actions.loadPendings();
    });
  }

  onConfirm() {
    const { camv_id } = this.state;
    this.setState({ confirm: false, camv_id: 0 });
    this.props.actions.delOne(camv_id).then(result => {
      this.props.actions.loadPendings();
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
    let movements = [];
    if (this.props.causeMovement.pendings.FreeAsso_CauseMovement) {
      movements = normalizedObjectModeler(this.props.causeMovement.pendings, 'FreeAsso_CauseMovement');
    }
    const header = (
      <InlineList>
        <Line header>
          <Col layoutSize={this.props.layoutSize || 'md'} md={12} lg={5} xl={5} col={12}>
            <span>Pour le</span>
          </Col>
          <Col layoutSize={this.props.layoutSize || 'md'} md={12} lg={7} xl={7} col={12}>
            <span>Animal</span>
          </Col>
          <Col layoutSize={this.props.layoutSize || 'md'} md={12} lg={6} xl={6} col={12}>
            <span>Statut</span>
          </Col>
          <Col layoutSize={this.props.layoutSize || 'md'} md={12} lg={7} xl={7} col={12}>
            <span>Depuis</span>
          </Col>
          <Col layoutSize={this.props.layoutSize || 'md'} md={12} lg={7} xl={7} col={12}>
            <span>Vers</span>
          </Col>
          <Col layoutSize={this.props.layoutSize || 'md'} md={12} lg={4} xl={4} col={12}>
          </Col>
        </Line>
      </InlineList>
    );
    return (
      <DashboardCard title="Mouvements en attente" icon={<MovementIcon />} size="md" header={header} >
        <div className="pending-movements">
          <div className="cause-movement-pendings text-secondary bg-secondary-light">
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
                        <Col layoutSize={this.props.layoutSize || 'md'} md={12} lg={5} xl={5} col={12}>
                          {intlDateTime(movement.camv_to, true)}
                        </Col>
                        <Col layoutSize={this.props.layoutSize || 'md'} md={12} lg={7} xl={7} col={12}>
                          {movement.cause.cau_code}
                        </Col>
                        <Col layoutSize={this.props.layoutSize || 'md'} md={12} lg={6} xl={6} col={12}>
                          {statusLabel(movement.camv_status)}
                        </Col>
                        <Col layoutSize={this.props.layoutSize || 'md'} md={12} lg={7} xl={7} col={12}>
                          {movement.from_site.site_name}
                        </Col>
                        <Col layoutSize={this.props.layoutSize || 'md'} md={12} lg={7} xl={7} col={12}>
                          {movement.to_site.site_name}
                        </Col>
                        <Col layoutSize={this.props.layoutSize || 'md'} md={12} lg={4} xl={4} col={12}>
                          {this.state.flipped && this.state.flipped === movement.id && (
                            <div
                              className="btn-group btn-group-sm float-right"
                              role="group"
                              aria-label="..."
                            >
                              {movement.camv_status === 'WAIT' && (
                                <button
                                  type="button"
                                  className="btn btn-inline btn-primary"
                                  onClick={() => this.onConfirmValidation(movement.id)}
                                >
                                  <SimpleValidIcon className="text-light inline-action" />
                                </button>
                              )}
                              <button
                                type="button"
                                className="btn btn-inline btn-warning"
                                onClick={() => this.onConfirmMovement(movement.id)}
                              >
                                <DelOneIcon className="text-light inline-action" />
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
            {this.props.causeMovement.loadPendingsPending && (
              <div className="inline-list">
                <div className="row row-line">
                  <div className="col-36 text-center">
                    <CenteredLoading3Dots />
                  </div>
                </div>
              </div>
            )}
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
            theme="success"
            onConfirm={() => {
              this.onValid();
            }}
          >
            <p>Confirmez-vous la validation du mouvement ?</p>
          </ResponsiveConfirm>
        </div>
      </DashboardCard>
    );
  }
}

function mapStateToProps(state) {
  return {
    causeMovement: state.causeMovement,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingMovements);

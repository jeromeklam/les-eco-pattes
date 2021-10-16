import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { normalizedObjectModeler } from 'jsonapi-front';
import { HoverObserver } from 'react-bootstrap-front';
import { propagateModel, intlDateTime } from '../../common';
import {
  GetOne as GetOneIcon,
  Movement as MovementIcon,
} from '../icons';
import { CenteredLoading3Dots, InlineList, Line, Col } from '../ui';
import { DashboardCard } from '../dashboard';
import { Input } from '../movement';
import { statusLabel } from './';

export class PendingMovements extends Component {
  static propTypes = {
    causeMovement: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    overlay: PropTypes.bool,
  };
  static defaultProps = {
    overlay: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      confirm: false,
      valid: false,
      move_id: -1,
      flipped: false,
    };
    this.onGetOne = this.onGetOne.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onGetOne = this.onGetOne.bind(this);
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

  mouseLeave() {
    this.setState({ flipped: false });
  }

  mouseEnter(id) {
    this.setState({ flipped: id });
  }

  render() {
    let counter = 1;
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
      <DashboardCard title="Animaux en attente de mouvement" icon={<MovementIcon />} size="md" header={header} overlay={this.props.overlay}>
        <div className="pending-movements">
          <div className="cause-movement-pendings text-secondary">
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
                                  className="btn btn-inline btn-secondary"
                                  onClick={() => this.onGetOne(movement.movement.id)}
                                >
                                  <GetOneIcon className="text-light inline-action" />
                                </button>
                              )}
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
                  <div className="col-xs-w36 text-center">
                    <CenteredLoading3Dots />
                  </div>
                </div>
              </div>
            )}
          </div>
          {parseInt(this.state.move_id, 10) > 0 && 
            <Input move_id={this.state.move_id} loader={false} onClose={this.onClose} />
          }
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

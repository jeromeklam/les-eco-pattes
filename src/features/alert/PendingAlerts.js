import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { normalizedObjectModeler } from 'jsonapi-front';
import { HoverObserver } from 'react-bootstrap-front';
import { intlDateTime } from '../../common';
import { DashboardCard } from '../dashboard';
import { Alert as AlertIcon, GetOne as GetOneIcon } from '../icons';
import { CenteredLoading3Dots, InlineList, Line, Col } from '../ui';
import { Modify } from './';

export class PendingAlerts extends Component {
  static propTypes = {
    alert: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      alert_id: -1,
      flipped: false,
    };
    this.mouseLeave = this.mouseLeave.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onGetOne = this.onGetOne.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadPendings();
  }

  mouseLeave() {
    this.setState({ flipped: false });
  }

  mouseEnter(id) {
    this.setState({ flipped: id });
  }

  onGetOne(id) {
    this.setState({ alert_id: id });
  }

  onClose() {
    this.setState({ alert_id: -1 });
    this.props.actions.loadPendings();
  }

  render() {
    let counter = 0;
    let alerts = [];
    if (this.props.alert.pendings.FreeFW_Alert) {
      alerts = normalizedObjectModeler(this.props.alert.pendings, 'FreeFW_Alert');
    }
    const header = (
      <InlineList>
        <Line header>
          <Col layoutSize={this.props.layoutSize || 'md'} md={16} lg={16} xl={16} col={12}>
            <span>Libellé</span>
          </Col>
          <Col layoutSize={this.props.layoutSize || 'md'} md={8} lg={8} xl={5} col={12}>
            <span>Prévu le</span>
          </Col>
          <Col layoutSize={this.props.layoutSize || 'md'} md={8} lg={8} xl={5} col={12}>
            <span>Echéance</span>
          </Col>
          <Col layoutSize={this.props.layoutSize || 'md'} md={4} lg={4} xl={4} col={12}>
          </Col>
        </Line>
      </InlineList>
    );
    return (
      <DashboardCard title="Alertes" icon={<AlertIcon />} size="md" header={header}>
        <div className="pending-alerts">
          <div className="alert-pendings text-secondary bg-secondary-light">
            {alerts && alerts.length > 0 ? (
              <InlineList>
                {alerts.map(alert => {
                  return (
                    <HoverObserver
                      key={`pending-${alert.id}`}
                      onMouseEnter={() => {
                        this.mouseEnter(alert.id);
                      }}
                      onMouseLeave={this.mouseLeave}
                    >
                      <Line oddEven={counter++}>
                        <Col
                          layoutSize={this.props.layoutSize || 'md'}
                          md={16}
                          lg={16}
                          xl={16}
                          col={12}
                        >
                          {alert.alert_title}
                        </Col>
                        <Col
                          layoutSize={this.props.layoutSize || 'md'}
                          md={8}
                          lg={8}
                          xl={5}
                          col={12}
                        >
                          {intlDateTime(alert.alert_from, true)}
                        </Col>
                        <Col
                          layoutSize={this.props.layoutSize || 'md'}
                          md={8}
                          lg={8}
                          xl={5}
                          col={12}
                        >
                          {intlDateTime(alert.alert_deadline, true)}
                        </Col>
                        <Col layoutSize={this.props.layoutSize || 'md'} md={4} lg={4} xl={4} col={12}>
                          {this.state.flipped && this.state.flipped === alert.id && (
                            <div className="btn-group btn-group-sm float-right" role="group" aria-label="...">
                              <button
                                type="button"
                                className="btn btn-inline btn-secondary"
                                onClick={() => {
                                  this.onGetOne(alert.id);
                                }}
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
                <span className="p-3">Aucune alerte</span>
              </div>
            )}
            {this.props.alert.loadPendingsPending && (
              <div className="inline-list">
                <div className="row row-line">
                  <div className="col-36 text-center">
                    <CenteredLoading3Dots />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {parseInt(this.state.alert_id, 10) > 0 && (
          <Modify alert_id={this.state.alert_id} onClose={this.onClose} loader={false} />
        )}
      </DashboardCard>
    );
  }
}

function mapStateToProps(state) {
  return {
    alert: state.alert,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingAlerts);

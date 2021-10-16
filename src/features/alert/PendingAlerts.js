import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { normalizedObjectModeler } from 'jsonapi-front';
import { HoverObserver } from 'react-bootstrap-front';
import { intlDateTime } from '../../common';
import { DashboardCard } from '../dashboard';
import {
  Expired as ExpiredIcon,
  AlertWarning as AlertWarningIcon,
  AlertDanger as AlertDangerIcon,
  GetOne as GetOneIcon,
} from '../icons';
import { CenteredLoading3Dots, InlineList, Line, Col } from '../ui';
import { Input } from './';

export class PendingAlerts extends Component {
  static propTypes = {
    alert: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    overlay: PropTypes.bool,
    mode: PropTypes.string,
  };
  static defaultProps = {
    overlay: false,
    mode: '',
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
    if (this.props.mode === 'warning') {
      this.props.actions.loadAlertsWarning();
    } else {
      this.props.actions.loadAlertsDanger();
    }
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
    if (this.props.mode === 'warning') {
      this.props.actions.loadAlertsWarning();
    } else {
      this.props.actions.loadAlertsDanger();
    }
  }

  render() {
    let counter = 1;
    let alerts = [];
    if (this.props.mode === 'warning') {
      if (this.props.alert.alertsWarning.FreeFW_Alert) {
        alerts = normalizedObjectModeler(this.props.alert.alertsWarning, 'FreeFW_Alert');
      }
    } else {
      if (this.props.alert.alertsDanger.FreeFW_Alert) {
        alerts = normalizedObjectModeler(this.props.alert.alertsDanger, 'FreeFW_Alert');
      }
    }
    const today = new Date().toISOString();
    const header = (
      <InlineList>
        <Line header>
          <Col size={{ xs: 16 }}>
            <span>Libellé</span>
          </Col>
          <Col size={{ xs: 8, md: 7 }}>
            <span>Prévu le</span>
          </Col>
          <Col size={{ xs: 8, md: 7 }}>
            <span>Echéance</span>
          </Col>
          <Col size={{ xs: 2 }} />
          <Col size={{ xs: 4 }} />
        </Line>
      </InlineList>
    );
    // Titre
    let title = 'Alertes';
    if (this.props.mode !== '') {
      switch (this.props.mode) {
        case 'warning':
          title = 'Alertes à échéances proches';
          break;
        case 'danger':
          title = 'Alertes à échéances dépassées';
          break;
        default:
          break;
      }
    }
    return (
      <DashboardCard
        title={title}
        icon={this.props.mode === 'warning' ? <AlertWarningIcon /> : <AlertDangerIcon />}
        size="md"
        header={header}
        overlay={this.props.overlay}
      >
        <div className="pending-alerts">
          <div className="alert-pendings text-secondary">
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
                        <Col size={{ xs: 16 }}>{alert.alert_title}</Col>
                        <Col size={{ xs: 8, md: 7 }}>{intlDateTime(alert.alert_from, true)}</Col>
                        <Col size={{ xs: 8, md: 7 }}>
                          {intlDateTime(alert.alert_deadline, true)}
                        </Col>
                        <Col size={{ xs: 2 }}>
                          {alert.alert_deadline <= today ? (
                            <ExpiredIcon className="col-icon" />
                          ) : (
                            ''
                          )}
                        </Col>
                        <Col size={{ xs: 4 }}>
                          {this.state.flipped && this.state.flipped === alert.id && (
                            <div
                              className="btn-group btn-group-sm float-right"
                              role="group"
                              aria-label="..."
                            >
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
              <InlineList>
                <Line oddEven={counter++}>
                  <Col size={{ xs: 36 }}>
                    <span className="p-3">Aucune alerte</span>
                  </Col>
                </Line>
              </InlineList>
            )}
            {((this.props.mode === 'warning' && this.props.alert.loadAlertsWarningPending) ||
              (this.props.mode === 'warning' && this.props.alert.loadAlertsDangerPending)) && (
              <div className="inline-list">
                <div className="row row-line">
                  <div className="col-xs-w36 text-center">
                    <CenteredLoading3Dots />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {parseInt(this.state.alert_id, 10) > 0 && (
          <Input alert_id={this.state.alert_id} onClose={this.onClose} loader={false} />
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

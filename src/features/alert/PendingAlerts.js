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
  Alert as AlertIcon, 
  GetOne as GetOneIcon } from '../icons';
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
    this.props.actions.loadPendings(this.props.mode);
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
    this.props.actions.loadPendings(this.props.mode);
  }

  render() {
    let counter = 0;
    let alerts = [];
    if (this.props.alert.pendings.FreeFW_Alert) {
      alerts = normalizedObjectModeler(this.props.alert.pendings, 'FreeFW_Alert');
    }
    const today = new Date().toISOString();
    const header = (
      <InlineList>
        <Line header>
          <Col layoutSize={this.props.layoutSize || 'md'} md={16} lg={16} xl={16} col={12}>
            <span>Libellé</span>
          </Col>
          <Col layoutSize={this.props.layoutSize || 'md'} md={7} lg={7} xl={5} col={8}>
            <span>Prévu le</span>
          </Col>
          <Col layoutSize={this.props.layoutSize || 'md'} md={7} lg={7} xl={5} col={8}>
            <span>Echéance</span>
          </Col>
          <Col layoutSize={this.props.layoutSize || 'md'} md={2} lg={2} xl={2} col={2}>
          </Col>
          <Col layoutSize={this.props.layoutSize || 'md'} md={4} lg={4} xl={4} col={6}>
          </Col>
        </Line>
      </InlineList>
    );
    // Titre
    let title = 'Alertes';
    if (this.props.mode !== '') {
      switch (this.props.mode) {
        case 'warning':
          title = 'Alertes à échéances proches'
          break;
        case 'danger':
          title = 'Alertes à échéances dépassées'
          break;
        default:
          break;
      }
    }
    return (
      <DashboardCard title={title} icon={<AlertIcon />} size="md" header={header} overlay={this.props.overlay}>
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
                          md={7}
                          lg={7}
                          xl={5}
                          col={8}
                        >
                          {intlDateTime(alert.alert_from, true)}
                        </Col>
                        <Col
                          layoutSize={this.props.layoutSize || 'md'}
                          md={7}
                          lg={7}
                          xl={5}
                          col={8}
                        >
                          {intlDateTime(alert.alert_deadline, true)}
                        </Col>
                        <Col
                          layoutSize={this.props.layoutSize || 'md'}
                          md={2}
                          lg={2}
                          xl={2}
                          col={2}
                        >
                          {(alert.alert_deadline <= today) ? <ExpiredIcon className="col-icon"/> : ''}
                        </Col>
                        <Col layoutSize={this.props.layoutSize || 'md'} md={4} lg={4} xl={4} col={6}>
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

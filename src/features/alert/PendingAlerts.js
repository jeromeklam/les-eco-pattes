import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { normalizedObjectModeler } from 'freejsonapi';
import { HoverObserver } from 'freeassofront';
import { intlDateTime } from '../../common';
import { DashboardCard } from '../dashboard';
import { Alert as AlertIcon } from '../icons';
import { CenteredLoading3Dots, InlineList, Line, Col } from '../ui';

export class PendingAlerts extends Component {
  static propTypes = {
    alert: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      alert_id: 0,
      flipped: false,
    };
    this.mouseLeave = this.mouseLeave.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
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

  render() {
    let counter = 0;
    let alerts = [];
    if (this.props.alert.pendings.FreeFW_Alert) {
      alerts = normalizedObjectModeler(this.props.alert.pendings, 'FreeFW_Alert');
    }
    const header = (
      <InlineList>
        <Line header>
          <Col layoutSize={this.props.layoutSize || 'md'} md={20} lg={20} xl={12} col={12}>
            <span>Libellé</span>
          </Col>
          <Col layoutSize={this.props.layoutSize || 'md'} md={8} lg={8} xl={5} col={12}>
            <span>Prévu le</span>
          </Col>
          <Col layoutSize={this.props.layoutSize || 'md'} md={8} lg={8} xl={5} col={12}>
            <span>Echéance</span>
          </Col>
        </Line>
      </InlineList>
    );
    return (
      <DashboardCard title="Alertes" icon={<AlertIcon />} size="md" header={header} >
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
                      <Line oddEven={counter++} >
                        <Col layoutSize={this.props.layoutSize || 'md'} md={20} lg={20} xl={12} col={12}>
                          {alert.alert_title}
                        </Col>
                        <Col layoutSize={this.props.layoutSize || 'md'} md={8} lg={8} xl={5} col={12}>
                          {intlDateTime(alert.alert_from, true)}
                        </Col>
                        <Col layoutSize={this.props.layoutSize || 'md'} md={8} lg={8} xl={5} col={12}>
                          {intlDateTime(alert.alert_deadline, true)}
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
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingAlerts);

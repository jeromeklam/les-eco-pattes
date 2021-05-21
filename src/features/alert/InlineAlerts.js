import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { ResponsiveConfirm, HoverObserver } from 'react-bootstrap-front';
import classnames from 'classnames';
import { intlDateTime } from '../../common';
import { GetOne as GetOneIcon, DelOne as DelOneIcon, AddOne as AddOneIcon } from '../icons';
import { CenteredLoading3Dots } from '../ui';
import { Input, getAlerts, getLibStatus } from './';

export class InlineAlerts extends Component {
  static propTypes = {
    alert: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.objId !== state.obj_id ||
      props.objName !== state.obj_name ||
      props.object !== state.object
    ) {
      return {
        obj_id: props.objId,
        obj_name: props.objName,
        object: props.object,
        alert_id: -1,
        confirm: false,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      confirm: false,
      alert_id: -1,
      object: props.object || null,
      obj_name: props.objName,
      obj_id: props.objId,
      items: [],
      loading: true,
      emptyItem: null,
      flipped: false,
    };
    this.onConfirm = this.onConfirm.bind(this);
    this.onAddOne = this.onAddOne.bind(this);
    this.onConfirmOpen = this.onConfirmOpen.bind(this);
    this.onConfirmClose = this.onConfirmClose.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onGetOne = this.onGetOne.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
    this.localLoadAlerts = this.localLoadAlerts.bind(this);
  }

  localLoadAlerts() {
    this.setState({ loading: true });
    getAlerts(this.state.obj_name, this.state.obj_id).then(result => {
      this.setState({ loading: false, items: result });
    });
  }

  componentDidMount() {
    this.localLoadAlerts();
    if (!this.state.emptyItem) {
      this.props.actions.loadOne(0).then(result => {
        this.setState({ emptyItem: this.props.alert.emptyItem });
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.obj_name !== this.state.obj_name || prevState.obj_id !== this.state.obj_id) {
      this.localLoadAlert();
    }
  }

  onAddOne() {
    this.setState({ alert_id: 0 });
  }

  onGetOne(id) {
    this.setState({ alert_id: id });
  }

  onClose() {
    this.setState({ alert_id: -1 });
    this.localLoadAlerts();
  }

  onConfirmOpen(id) {
    this.setState({ confirm: true, alert_id: id });
  }

  onConfirm(id) {
    const { alert_id } = this.state;
    this.setState({ confirm: false, alert_id: -1 });
    this.props.actions.delOne(alert_id).then(result => {
      this.localLoadAlerts();
    });
  }

  onConfirmClose() {
    this.setState({ confirm: false, alert_id: -1 });
  }

  mouseLeave() {
    this.setState({ flipped: false });
  }

  mouseEnter(id) {
    this.setState({ flipped: id });
  }

  render() {
    let counter = 0;
    const alerts = this.state.items;
    if (this.state.loading) {
      return (
        <div className="alert-inline-alerts">
          <CenteredLoading3Dots className="text-light" />
        </div>
      );
    } else {
      return (
        <div className="alert-inline-alerts">
          <div className="inline-list">
            <div
              className={classnames(
                'row row-title row-line',
                counter++ % 2 !== 1 ? 'row-odd' : 'row-even',
              )}
              key="alert-inline-alerts"
            >
              <div className="col-xs-w6 col-first">
                <span>Date début</span>
              </div>
              <div className="col-xs-w6">
                <span>Date fin</span>
              </div>
              <div className="col-xs-w11">
                <span>Libellé</span>
              </div>
              <div className="col-xs-w9">
                <span>Etat</span>
              </div>
              <div className="col-xs-w4 text-right col-last">
                <div className="btn-group btn-group-xs" role="group" aria-label="...">
                  <button
                    type="button"
                    className="btn btn-inline btn-primary"
                    onClick={this.onAddOne}
                  >
                    <AddOneIcon className="inline-action text-light" />
                  </button>
                </div>
              </div>
            </div>
            {alerts &&
              alerts.length > 0 &&
              alerts.map(alert => (
                <HoverObserver
                  onMouseEnter={() => {
                    this.mouseEnter(alert.id);
                  }}
                  onMouseLeave={this.mouseLeave}
                >
                  <div
                    className={classnames(
                      'row row-line',
                      counter++ % 2 !== 1 ? 'row-odd' : 'row-even',
                    )}
                    key={alert.id}
                  >
                    <div className="col-xs-w6 col-first">{intlDateTime(alert.alert_from)}</div>
                    <div className="col-xs-w6">{intlDateTime(alert.alert_to)}</div>
                    <div className="col-xs-w11">{alert.alert_title}</div>
                    <div className="col-xs-w9">
                      {getLibStatus(alert.alert_done_ts, alert.alert_deadline)}
                    </div>
                    <div className="col-xs-w4 text-right col-last">
                      {this.state.flipped && this.state.flipped === alert.id && (
                        <div className="btn-group btn-group-xs" role="group" aria-label="...">
                          <button
                            type="button"
                            className="btn btn-inline btn-secondary"
                            onClick={() => {
                              this.onGetOne(alert.id);
                            }}
                          >
                            <GetOneIcon className="inline-action text-light" />
                          </button>
                          <button
                            type="button"
                            className="btn btn-inline btn-warning"
                            onClick={() => this.onConfirmOpen(alert.id)}
                          >
                            <DelOneIcon className="inline-action text-light" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </HoverObserver>
              ))}
            <ResponsiveConfirm
              show={this.state.confirm}
              onClose={this.onConfirmClose}
              onConfirm={() => {
                this.onConfirm();
              }}
            />
          </div>
          <div>
            {!this.state.confirm && this.state.alert_id === 0 && (
              <Input
                onClose={this.onClose}
                object={this.state.object}
                objName={this.state.obj_name}
                objId={this.state.obj_id}
              />
            )}
            {!this.state.confirm && this.state.alert_id > 0 && (
              <Input onClose={this.onClose} alert_id={this.state.alert_id} />
            )}
          </div>
        </div>
      );
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(InlineAlerts);

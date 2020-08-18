import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { ResponsiveConfirm, HoverObserver } from 'freeassofront';
import classnames from 'classnames';
import { intlDate } from '../../common';
import { 
  GetOne as GetOneIcon, 
  DelOne as DelOneIcon, 
  AddOne as AddOneIcon } from '../icons';
import { CenteredLoading3Dots } from '../ui';
import { Create, Modify, getAlerts } from './';

export class InlineAlerts extends Component {
  static propTypes = {
    alert: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.objId !== state.obj_id || props.objName !== state.obj_name) {
      return { obj_id: props.objId, obj_name: props.abjName, alert_id: -1, confirm: false };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      confirm: false,
      alert_id: -1,
      obj_id: props.objId,
      obj_name: props.objName || '',
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
    getAlerts(this.state.obj_id).then(result => {
      this.setState({ loading: false, items: result });
    });
  }

  componentDidMount() {
    this.localLoadAlerts();
    if (!this.state.emptyItem) {
      this.props.actions.loadOne(0).then(result => {
         this.setState({emptyItem: this.props.alert.emptyItem});
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.obj !== this.state.obj) {
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
            <div className={classnames('row row-title row-line', (counter++ % 2 !== 1) ? 'row-odd' : 'row-even')} key="alert-inline-alerts">
              <div className="col-6 col-first">
                <span>Du</span>
              </div>
              <div className="col-4 text-right col-last">
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
                <HoverObserver onMouseEnter={() => {this.mouseEnter(alert.id)}} onMouseLeave={this.mouseLeave}>
                  <div className={classnames('row row-line', (counter++ % 2 !== 1) ? 'row-odd' : 'row-even')} key={alert.id}>
                    <div className="col-6 col-first">{intlDate(alert.alert_from)}</div>
                    <div className="col-4 text-right col-last">
                    {this.state.flipped && this.state.flipped === alert.id && 
                      <div className="btn-group btn-group-xs" role="group" aria-label="...">
                        <button
                          type="button"
                          className="btn btn-inline btn-secondary"
                          onClick={() => {this.onGetOne(alert.id)}}
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
                    }
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
          {!this.state.confirm && this.state.alert_id === 0 && <Create onClose={this.onClose} obj={this.state.obj} />}
          {!this.state.confirm && this.state.alert_id > 0 && (
            <Modify onClose={this.onClose} alert_id={this.state.alert_id} obj={this.state.obj} />
          )}
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
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InlineAlerts);

import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ResponsiveConfirm, HoverObserver } from 'freeassofront';
import * as actions from './redux/actions';
import { intlDateTime } from '../../common';
import { GetOne as GetOneIcon, DelOne as DelOneIcon, AddOne as AddOneIcon } from '../icons';
import { CenteredLoading3Dots } from '../ui';
import { Create, Modify, getWhereLabel, getCareLabel, getSicknesses } from './';

export class InlineSicknesses extends Component {
  static propTypes = {
    causeSickness: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.cause !== state.cause) {
      return { cause: props.cause, caus_id: -1, confirm: false };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      confirm: false,
      caus_id: -1,
      cause: props.cause,
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
    this.localLoadSicknesses = this.localLoadSicknesses.bind(this);
  }

  localLoadSicknesses() {
    this.setState({ loading: true });
    getSicknesses(this.state.cause.id).then(result => {
      this.setState({ loading: false, items: result });
    });
  }

  componentDidMount() {
    this.localLoadSicknesses();
    if (!this.state.emptyItem) {
      this.props.actions.loadOne(0).then(result => {
         this.setState({emptyItem: this.props.causeSickness.emptyItem});
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cause !== this.state.cause) {
      this.localLoadSicknesses();
    }
  }

  onAddOne() {
    this.setState({ caus_id: 0 });
  }

  onGetOne(id) {
    this.setState({ caus_id: id });
  }

  onClose() {
    this.setState({ caus_id: -1 });
    this.localLoadSicknesses();
  }

  onConfirmOpen(id) {
    this.setState({ confirm: true, caus_id: id });
  }

  onConfirm(id) {
    const { caus_id } = this.state;
    this.setState({ confirm: false, caus_id: -1 });
    this.props.actions.delOne(caus_id).then(result => {
      this.localLoadSicknesses();
    });
  }

  onConfirmClose() {
    this.setState({ confirm: false, caus_id: -1 });
  }

  mouseLeave() {
    this.setState({ flipped: false });
  }

  mouseEnter(id) {
    this.setState({ flipped: id });
  }

  render() {
    let counter = 0;
    const sicknesses = this.state.items;
    if (this.state.loading) {
      return (
        <div className="cause-inline-sicknesses">
          <CenteredLoading3Dots className="text-light" />
        </div>
      );
    } else {
      return (
        <div className="cause-inline-sicknesses">
          <div className="inline-list">
            <div className={classnames('row row-title row-line', (counter++ % 2 !== 1) ? 'row-odd' : 'row-even')} key="cause-inline-sicknesses">
              <div className="col-6 col-first">
                <span>Du</span>
              </div>
              <div className="col-6">
                <span>Au</span>
              </div>
              <div className="col-6">
                <span>Lieu</span>
              </div>
              <div className="col-6">
                <span>Soins</span>
              </div>
              <div className="col-8">
                <span>Maladie</span>
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
            {sicknesses &&
              sicknesses.length > 0 &&
              sicknesses.map(sickness => (
                <HoverObserver onMouseEnter={() => {this.mouseEnter(sickness.id)}} onMouseLeave={this.mouseLeave}>
                  <div className={classnames('row row-line', (counter++ % 2 !== 1) ? 'row-odd' : 'row-even')} key={sickness.id}>
                    <div className="col-6 col-first">{intlDateTime(sickness.caus_from, true)}</div>
                    <div className="col-6">{intlDateTime(sickness.caus_to, true)}</div>
                    <div className="col-6">{getWhereLabel(sickness.caus_where)}</div>
                    <div className="col-6">{getCareLabel(sickness.caus_care)}</div>
                    <div className="col-8">{sickness.sickness && sickness.sickness.sick_name}</div>
                    <div className="col-4 text-right col-last">
                    {this.state.flipped && this.state.flipped === sickness.id && 
                      <div className="btn-group btn-group-xs" role="group" aria-label="...">
                        <button
                          type="button"
                          className="btn btn-inline btn-secondary"
                          onClick={() => {this.onGetOne(sickness.id)}}
                        >
                          <GetOneIcon className="inline-action text-light" />
                        </button>
                        <button
                          type="button"
                          className="btn btn-inline btn-warning"
                          onClick={() => this.onConfirmOpen(sickness.id)}
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
          {!this.state.confirm && this.state.caus_id === 0 && <Create onClose={this.onClose} cause={this.state.cause} />}
          {!this.state.confirm && this.state.caus_id > 0 && (
            <Modify onClose={this.onClose} caus_id={this.state.caus_id} cause={this.state.cause} />
          )}
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    causeSickness: state.causeSickness,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InlineSicknesses);

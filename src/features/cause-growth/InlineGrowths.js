import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getJsonApi } from 'freejsonapi';
import { ResponsiveConfirm, HoverObserver } from 'freeassofront';
import * as actions from './redux/actions';
import { propagateModel, intlDate } from '../../common';
import { CenteredLoading3Dots, createSuccess, showErrors } from '../ui';
import { DelOne as DelOneIcon } from '../icons';
import { InlineGrowthForm, getGrowths } from './';

export class InlineGrowths extends Component {
  static propTypes = {
    causeGrowth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.cause !== state.cause) {
      return { cause: props.cause, grow_id: 0, confirm: false };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      confirm: false,
      grow_id: 0,
      cause: props.cause,
      items: [],
      loading: [],
      emptyItem: null,
      flipped: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onConfirmOpen = this.onConfirmOpen.bind(this);
    this.onConfirmClose = this.onConfirmClose.bind(this);
    this.localLoadGrowths = this.localLoadGrowths.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
  }

  localLoadGrowths() {
    this.setState({ loading: true });
    getGrowths(this.state.cause.id).then(result => {
      this.setState({ loading: false, items: result });
    });
  }

  componentDidMount() {
    this.localLoadGrowths();
    if (!this.state.emptyItem) {
      this.props.actions.loadOne(0).then(result => {
         this.setState({emptyItem: this.props.causeGrowth.emptyItem});
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cause !== this.state.cause) {
      this.localLoadGrowths();
    }
  }

  onSubmit(datas = {}) {
    // Conversion des données en objet pour le service web
    const { cause } = this.state;
    datas.cause = cause;
    const obj = getJsonApi(datas, 'FreeAsso_CauseGrowth');
    this.props.actions
      .createOne(obj)
      .then(result => {
        createSuccess();
        this.props.actions.propagateModel('FreeAsso_CauseGrowth', result);
        this.localLoadGrowths();
      })
      .catch(errors => {
        showErrors(this.props.intl, errors, 'createOneError');
      });
  }

  onConfirmOpen(id) {
    this.setState({ confirm: true, grow_id: id });
  }

  onConfirm(id) {
    const { grow_id } = this.state;
    this.setState({ confirm: false, grow_id: 0 });
    this.props.actions.delOne(grow_id).then(result => {
      this.localLoadGrowths();
    });
  }

  onConfirmClose() {
    this.setState({ confirm: false, grow_id: 0 });
  }

  mouseLeave() {
    this.setState({ flipped: false });
  }

  mouseEnter(id) {
    this.setState({ flipped: id });
  }

  render() {
    let counter = 0;
    const growths = this.state.items;
    if (this.state.loading) {
      return (
        <div className="cause-inline-movements">
          <CenteredLoading3Dots />
        </div>
      );
    } else {
      return (
        <div className="cause-inline-growths">
          <div className="row">
            <div className="col-sm-18">
              <div className="inline-list text-center">
                <div
                  className={classnames(
                    'row row-title row-line',
                    counter++ % 2 !== 1 ? 'row-odd' : 'row-even',
                  )}
                  key="cause-inline-growths"
                >
                  <div className="col-16 col-first">
                    <span>Date</span>
                  </div>
                  <div className="col-8">
                    <span>Poids</span>
                  </div>
                  <div className="col-8">
                    <span>Taille</span>
                  </div>
                  <div className="col-4">
                    <span></span>
                  </div>
                </div>
                {this.state.emptyItem && (
                  <div classname="row">
                    <div classname="col-sm-36">
                      <InlineGrowthForm
                        oddEven={counter++}
                        cause={this.state.cause}
                        item={this.state.emptyItem}
                        errors={this.props.causeGrowth.createOneError}
                        onSubmit={this.onSubmit}
                      />
                    </div>
                  </div>
                )}
                {growths &&
                  growths.length > 0 &&
                  growths.map(growth => (
                    <HoverObserver onMouseEnter={() => {this.mouseEnter(growth.id)}} onMouseLeave={this.mouseLeave}>
                      <div
                        className={classnames(
                          'row row-line',
                          counter++ % 2 !== 1 ? 'row-odd' : 'row-even',
                        )}
                        key={growth.id}
                      >
                        <div className="col-16 col-first">{intlDate(growth.grow_ts)}</div>
                        <div className="col-8">{growth.grow_weight}</div>
                        <div className="col-8">{growth.grow_height}</div>
                        <div className="col-4 text-right">
                        {this.state.flipped && this.state.flipped === growth.id && 
                          <div className="btn-group btn-group-sm" role="group" aria-label="...">
                            <div className="btn-group" role="group" aria-label="First group">
                              <button className="btn btn-inline btn-warning">
                                <DelOneIcon
                                  onClick={() => this.onConfirmOpen(growth.id)}
                                  className="text-light inline-action"
                                />
                              </button>
                            </div>
                          </div>
                        }
                        </div>
                      </div>
                    </HoverObserver>
                  ))}
              </div>
            </div>
            <ResponsiveConfirm
              show={this.state.confirm}
              onClose={this.onConfirmClose}
              onConfirm={() => {
                this.onConfirm();
              }}
            />
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    causeGrowth: state.causeGrowth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InlineGrowths);

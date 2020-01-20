import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { buildModel } from 'freejsonapi';
import * as actions from './redux/actions';
import { CenteredLoading3Dots } from '../ui';
import { InlineMovementForm } from '../cause-movement';

export class InlineMovements extends Component {
  static propTypes = {
    causeMovement: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    if (!this.props.causeMovement.emptyItem) {
      this.props.actions.loadOne(0);
    }
  }

  render() {
    let movements = [];
    if (this.props.causeMovement.movements.FreeAsso_CauseMovement) {
      movements = buildModel(this.props.causeMovement.movements, 'FreeAsso_CauseMovement');
    }
    if (this.props.causeMovement.loadMovementsPending) {
      return (
        <div className="cause-inline-mevements">
          <CenteredLoading3Dots className="text-light" />
        </div>
      );
    } else {
      if (movements && movements.legnth > 0) {
        return (
          <div className="cause-inline-mevements">
            {movements.map(movement => {
              <div className="row">
                <div className="col-5">
                </div>
              </div>
            })}
            <div className="row p-3">
              <div className="col-36">
                {this.props.causeMovement.emptyItem &&
                  <InlineMovementForm item={this.props.causeMovement.emptyItem} />
                }
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="cause-inline-mevements">
            <div className="row p-3">
              <div className="col-36">
                {this.props.causeMovement.emptyItem &&
                  <InlineMovementForm item={this.props.causeMovement.emptyItem} />
                }
              </div>
            </div>
          </div>
        );
      }
    }
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    causeMovement: state.causeMovement,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InlineMovements);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { buildModel } from 'freejsonapi';
import * as actions from './redux/actions';
import { getJsonApi } from 'freejsonapi';
import { CenteredLoading3Dots, createSuccess, createError } from '../ui';
import { InlineMovementForm } from '../cause-movement';

export class InlineMovements extends Component {
  static propTypes = {
    causeMovement: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (!this.props.causeMovement.emptyItem) {
      this.props.actions.loadOne(0);
    }
  }

  onSubmit(datas = {}) {
    console.log(datas);
    // Conversion des données en objet pour le service web
    let obj = getJsonApi(datas, 'FreeAsso_CauseMovement');
    this.props.actions
      .createOne(obj)
      .then(result => {
        createSuccess();
      })
      .catch(errors => {
        // @todo display errors to fields
        createError();
      });
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
      if (movements && movements.length > 0) {
        return (
          <div className="cause-inline-mevements">
            {movements.map(movement => {
              return (
                <div className="row" key={movement.id}>
                  <div className="col-5"></div>
                  <div className="col-10">{movement.from_site.site_name}</div>
                  <div className="col-10">{movement.to_site.site_name}</div>
                </div>
              );
            })}
            <div className="row p-3">
              <div className="col-36">
                {this.props.causeMovement.emptyItem && (
                  <InlineMovementForm
                    cause={this.props.causeMovement.cause}
                    item={this.props.causeMovement.emptyItem}
                    onSubmit={this.onSubmit}
                  />
                )}
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="cause-inline-mevements">
            <div className="row p-3">
              <div className="col-36">
                {this.props.causeMovement.emptyItem && (
                  <InlineMovementForm
                    cause={this.props.causeMovement.cause}
                    item={this.props.causeMovement.emptyItem}
                    onSubmit={this.onSubmit}
                  />
                )}
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { buildModel } from 'freejsonapi';
import { Loading3Dots } from 'freeassofront';
import { connect } from 'react-redux';
import striptags from 'striptags';
import * as actions from './redux/actions';
import { DashboardCard } from '../dashboard';
import { Medical as SicknessIcon, GetOne as GetOneIcon } from '../icons';
import { InlineList, Line, Col } from '../ui';
import { Modify as ModifyCauseSickness } from '../cause-sickness';

export class PendingSicknesses extends Component {
  static propTypes = {
    causeSickness: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    layoutSize: PropTypes.string,
  };

  static defaultProps = {
    layoutSize: 'lg',
  };

  constructor(props) {
    super(props);
    this.state = {
      caus_id: -1,
    };
    this.onGetOne = this.onGetOne.bind(this);
    this.onCloseForm = this.onCloseForm.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadPendings();
  }

  onGetOne(id) {
    this.setState({ caus_id: id });
  }

  onCloseForm() {
    this.setState({ caus_id: -1 });
    this.props.actions.loadPendings();
  }

  render() {
    let counter = 0;
    let sicknesses = [];
    if (this.props.causeSickness.pendings.FreeAsso_CauseSickness) {
      sicknesses = buildModel(this.props.causeSickness.pendings, 'FreeAsso_CauseSickness');
    }
    return (
      <DashboardCard title="Maladies à traiter" icon={<SicknessIcon />} size="md">
        <div>
          <div className="cause-movement-pendings text-secondary bg-secondary-light">
            {sicknesses && sicknesses.length > 0 ? (
              <InlineList>
                <Line header oddEven={counter}>
                  <Col layoutSize={this.props.layoutSize || 'md'} md={16} lg={9} xl={9} col={16}>
                    <span>Animal</span>
                  </Col>
                  <Col layoutSize={this.props.layoutSize || 'md'} md={20} lg={9} xl={9} col={20}>
                    <span>Maladie</span>
                  </Col>
                  <Col layoutSize={this.props.layoutSize || 'md'} md={16} lg={9} xl={9} col={16}>
                    <span>Lieu</span>
                  </Col>
                  <Col layoutSize={this.props.layoutSize || 'md'} md={20} lg={9} xl={9} col={20}>
                    <span>Description</span>
                  </Col>
                </Line>
                {sicknesses.map(sickness => {
                  return (
                    <Line oddEven={counter} key={`pending-${sickness.id}`}>
                      <Col
                        layoutSize={this.props.layoutSize || 'md'}
                        md={16}
                        lg={7}
                        xl={7}
                        col={16}
                      >
                        {sickness.cause.cau_code}
                      </Col>
                      <Col
                        layoutSize={this.props.layoutSize || 'md'}
                        md={20}
                        lg={9}
                        xl={9}
                        col={20}
                      >
                        {sickness.sickness.sick_name}
                      </Col>
                      <Col
                        layoutSize={this.props.layoutSize || 'md'}
                        md={16}
                        lg={9}
                        xl={9}
                        col={16}
                      >
                        {sickness.cause.site.site_name}
                      </Col>
                      <Col
                        layoutSize={this.props.layoutSize || 'md'}
                        md={20}
                        lg={9}
                        xl={9}
                        col={20}
                      >
                        {striptags(sickness.caus_care_desc)}
                      </Col>
                      <Col
                        layoutSize={this.props.layoutSize || 'md'}
                        md={36}
                        lg={2}
                        xl={2}
                        col={36}
                      >
                        <div className="btn-group btn-group-sm" role="group" aria-label="...">
                          <button
                            type="button"
                            className="btn btn-inline btn-secondary"
                            onClick={() => this.onGetOne(sickness.id)}
                          >
                            <GetOneIcon className="text-light inline-action" />
                          </button>
                        </div>
                      </Col>
                    </Line>
                  );
                })}
              </InlineList>
            ) : (
              <div>
                <span className="p-3">Aucun animal malade</span>
              </div>
            )}
            {this.props.causeSickness.loadPendingsPending && (
              <div className="inline-list">
                <div className="row row-line">
                  <div className="col-36 text-center">
                    <Loading3Dots />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {this.state.caus_id > 0 && (
          <ModifyCauseSickness caus_id={this.state.caus_id} onClose={this.onCloseForm} />
        )}
      </DashboardCard>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    causeSickness: state.causeSickness,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingSicknesses);

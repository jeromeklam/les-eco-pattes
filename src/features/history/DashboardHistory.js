import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { normalizedObjectModeler } from 'jsonapi-front';
import { displayDatetime, Col } from 'react-bootstrap-front';
import { CenteredLoading3Dots, InlineList, Line, Avatar } from '../ui';
import { DashboardCard } from '../dashboard';
import { History as HistoryIcon } from '../icons';
import { getLibObject, getLibMethod } from './';

export class DashboardHistory extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    overlay: PropTypes.bool,
  };

  componentDidMount() {
    this.props.actions.loadMore();
  }

  render() {
    let counter = 0;
    let history = [];
    if (this.props.history.items.POFW_History) {
      history = normalizedObjectModeler(this.props.history.items, 'FreeFW_History');
    }
    const header = (
      <InlineList>
        <Line header oddEven={counter}>
          <Col size={{ xs: 18, sm: 10 }}>
            <span>Date</span>
          </Col>
          <Col size={{ xs: 18, sm: 10 }}>
            <span>Objet</span>
          </Col>
          <Col size={{ xs: 18, sm: 10 }}>
            <span>Action</span>
          </Col>
          <Col size={{ xs: 18, sm: 6 }}>
            <span>Utilisateurs</span>
          </Col>
        </Line>
      </InlineList>
    );
    return (
      <DashboardCard
        title="Historique"
        icon={<HistoryIcon />}
        overlay={this.props.overlay}
        size="lg"
        header={header}
      >
        <div className="history text-secondary bg-secondary-light">
          {history && history.length > 0 ? (
            <InlineList>
              {history.map(hist => {
                counter++;
                return (
                  <Line oddEven={counter} key={`pending-${hist.id}`}>
                    <Col size={{ xs: 18, sm: 10 }}>
                      <span>{displayDatetime(hist.hist_ts)}</span>
                    </Col>
                    <Col size={{ xs: 18, sm: 10 }}>
                      <span>{getLibObject(hist.hist_object_name, hist.id)}</span>
                    </Col>
                    <Col size={{ xs: 18, sm: 10 }}>
                      <span>{getLibMethod(hist.hist_method)}</span>
                    </Col>
                    <Col size={{ xs: 18, sm: 6 }}>
                      <Avatar user={hist.user} className="rounded-circle" size="22" />
                    </Col>
                  </Line>
                );
              })}
            </InlineList>
          ) : (
            <div>
              <span className="p-3">Aucun historique</span>
            </div>
          )}
          {this.props.history.loadMorePending && (
            <div className="inline-list">
              <div className="row row-line">
                <div className="col-xs-w36 text-center">
                  <CenteredLoading3Dots />
                </div>
              </div>
            </div>
          )}
        </div>
      </DashboardCard>
    );
  }
}

function mapStateToProps(state) {
  return {
    history: state.history,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardHistory);

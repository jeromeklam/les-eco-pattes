import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { displayDatetime } from 'react-bootstrap-front';
import { InboxEmpty, Download } from '../icons';

export class InlineInbox extends Component {
  static propTypes = {
    inbox: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.downloadInbox = this.downloadInbox.bind(this);
  }

  downloadInbox(ev, elem) {
    this.props.actions.downloadOne(elem).then(result => { });
  }

  render() {
    return (
      <div className="inbox-inline-inbox">
        <ul className="list-group">
          {Array.isArray(this.props.inbox.models) &&
            this.props.inbox.models.map(elem => {
              return (
                <li
                  className={classnames(
                    'card inbox-card ml-3 mr-3 mt-2',
                    elem.inbox_download_ts ? 'border-primary' : 'border-secondary',
                  )}
                  key={`inbox-${elem.id}`}
                  onClick={ev => this.downloadInbox(ev, elem)}
                >
                  <div className="card-body">
                    {elem.inbox_download_ts ? <InboxEmpty /> : <Download />}
                    <span className="pl-2">{elem.inbox_filename}</span>
                    &nbsp;-&nbsp;
                    <span>{displayDatetime(elem.inbox_ts)}</span>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    inbox: state.inbox,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InlineInbox);

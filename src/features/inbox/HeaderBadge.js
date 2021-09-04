import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Badge, Dropdown, DropdownMenu, DropdownMenuOption, displayDatetime } from 'react-bootstrap-front';
import { InboxEmpty, InboxFull, Download } from '../icons';

export class HeaderBadge extends Component {
  static propTypes = {
    inbox: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    className: PropTypes.string,
  };
  static defaultProps = {
    className: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      myRef: React.createRef(),
    };
    this.onClick = this.onClick.bind(this);
    this.downloadInbox = this.downloadInbox.bind(this);
  }

  onClick() {
    this.setState({ opened: !this.state.opened });
  }

  downloadInbox(ev, id) {
    this.props.actions.downloadOne(id).then(res => {
      this.props.actions.loadMore();
    });
  }

  render() {
    return (
      <>
        <div ref={this.state.myRef}>
          <Badge
            name="inbox"
            count={this.props.inbox.items.TOTAL}
            icon={this.props.inbox.not_downloaded > 0 ? <InboxFull /> : <InboxEmpty />}
            onClick={this.props.onClick ? this.props.onClick : this.onClick}
            className={classnames(this.props.className)}
          />
        </div>
        {this.state.opened && (
          <Dropdown myRef={this.state.myRef} onClose={this.onClick}>
            <div onClick={this.onClick}>
              <DropdownMenu>
                {this.props.inbox.models.map(elem => {
                  return (
                    <DropdownMenuOption
                      key={`inbox-${elem.id}`}
                      onClick={ev => this.downloadInbox(ev, elem)}
                    >
                      <>
                        {elem.inbox_download_ts ? <InboxEmpty /> : <Download />}
                        <span className="pl-2">{elem.inbox_filename}</span>
                        &nbsp;-&nbsp;
                        <span>{displayDatetime(elem.inbox_ts)}</span>
                      </>
                    </DropdownMenuOption>
                  );
                })}
              </DropdownMenu>
            </div>
          </Dropdown>
        )}
      </>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    inbox: state.inbox,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBadge);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LoadingData, LoadMore, LoadError, LoadComplete } from '../layout';

export default class MobileListFooter extends Component {
  static propTypes = {
    loadMorePending: PropTypes.bool.isRequired,
    loadMoreFinish: PropTypes.bool.isRequired,
    loadMoreError: PropTypes.object,
    onLoadMore: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className="common-desktop-list-footer">
        {this.props.loadMorePending ? (
          <LoadingData />
        ) : (
          <div>{this.props.loadMoreFinish ? <LoadComplete /> : <LoadMore onLoadMore={this.props.onLoadMore} />}</div>
        )}
        {this.props.loadMoreError && <LoadError />}
      </div>
    );
  }
}

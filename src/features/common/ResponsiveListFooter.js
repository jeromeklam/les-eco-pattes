import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Desktop, Tablet, Mobile, Default, MobileListFooter, DesktopListFooter } from '.';

export default class ResponsiveListFooter extends Component {
  static propTypes = {
    onLoadMore: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div>
        <Mobile>
          <MobileListFooter {...this.props} onLoadMore={this.props.onLoadMore} />
        </Mobile>
        <Desktop>
          <DesktopListFooter {...this.props} onLoadMore={this.props.onLoadMore} />
        </Desktop>
      </div>
    );
  }
}

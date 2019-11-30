import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Desktop, Tablet, Mobile, Default, MobileListHeader, DesktopListHeader } from '.';

export default class ResponsiveListHeader extends Component {
  static propTypes = {};

  render() {
    return (
      <div>
        <Mobile>
          <MobileListHeader {...this.props} />
        </Mobile>
        <Desktop>
          <DesktopListHeader {...this.props} />
        </Desktop>
      </div>
    );
  }
}

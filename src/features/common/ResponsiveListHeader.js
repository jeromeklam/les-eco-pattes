import React, { Component } from 'react';
import { Desktop, Mobile, MobileListHeader, DesktopListHeader } from '.';

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

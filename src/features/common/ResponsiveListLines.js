import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Desktop, Tablet, Mobile, Default, MobileListLines, DesktopListLines } from '.';

export default class ResponsiveListLines extends Component {
  static propTypes = {};

  render() {
    return (
      <div>
        <Mobile>
          <MobileListLines {...this.props}>{this.props.children}</MobileListLines>
        </Mobile>
        <Desktop>
          <DesktopListLines {...this.props}>{this.props.children}</DesktopListLines>
        </Desktop>
      </div>
    );
  }
}

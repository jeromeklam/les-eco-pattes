import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Desktop, Tablet, Mobile, Default, MobileListFooter, DesktopListFooter } from '.';

export default class ResponsiveListFooter extends Component {
  static propTypes = {};

  render() {
    return (
      <div>
        <Mobile>
          <MobileListFooter {...this.props} />
        </Mobile>
        <Desktop>
          <DesktopListFooter {...this.props} />
        </Desktop>
      </div>
    );
  }
}

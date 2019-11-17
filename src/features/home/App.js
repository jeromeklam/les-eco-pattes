import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DesktopHeader, DesktopFooter, DesktopSidebar } from '../../features/common';
import { MobileHeader, MobileFooter } from '../../features/common';
import { Desktop, Tablet, Mobile, Default } from '../common'

/*
  This is the root component of your app. Here you define the overall layout
  and the container of the react router.
  You should adjust it according to the requirement of your app.
*/
export default class App extends Component {

  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: '',
  };

  render() {
    return (
      <div className="d-flex" id="wrapper">
        <Tablet>Tablet @TODO</Tablet>
        <Mobile>
          <MobileHeader />
          <div id="page-content-wrapper" classname="w-100">
            {this.props.children}
          </div>
          <MobileFooter />
        </Mobile>
        <Desktop>
          <DesktopSidebar />
          <div id="page-content-wrapper" classname="w-100">
            <DesktopHeader />
            {this.props.children}
          </div>
          <DesktopFooter />
        </Desktop>
      </div>
    );
  }
}

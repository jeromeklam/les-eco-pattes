import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DesktopHeader, DesktopFooter, DesktopSidebar } from '../../features/common';
import { MobileHeader, MobileFooter, MobileMenu } from '../../features/common';
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

  constructor(props) {
    super(props);
    this.state = {
      menuDataOpen: false
    };
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle () {
    this.setState({menuDataOpen: !this.state.menuDataOpen});
  }

  render() {
    return (
      <div className="d-flex" id="wrapper">
        <Tablet>Tablet @TODO</Tablet>
        <Mobile>
          <MobileHeader />
          <div id="page-content-wrapper" className="w-100">
            {this.props.children}
          </div>
          {this.state.menuDataOpen &&
            <MobileMenu onToggle={this.onToggle}/>
          }
          <MobileFooter onToggle={this.onToggle}/>
        </Mobile>
        <Desktop>
          <DesktopSidebar />
          <div id="page-content-wrapper" className="w-100">
            <DesktopHeader />
            {this.props.children}
          </div>
          <DesktopFooter />
        </Desktop>
      </div>
    );
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DesktopHeader, DesktopFooter, DesktopSidebar } from '../../features/common';
import { MobileHeader, MobileFooter } from '../../features/common';
import { useMediaQuery } from 'react-responsive'
import fond from '../../images/fond-les-eco-pattes.png';
import logo from '../../images/logo-les-eco-pattes.jpg';

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 })
  return isDesktop ? children : null
}
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
  return isTablet ? children : null
}
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  return isMobile ? children : null
}
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 })
  return isNotMobile ? children : null
}

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
          <div className="text-center">
            <img src={logo} />
          </div>
          <MobileFooter />
        </Mobile>
        <Default>
          <DesktopSidebar />
          <div id="page-content-wrapper">
            <DesktopHeader />
            <div className="container-fluid">
              <div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
                <div className="text-center">
                  <br />
                  <img src={fond} />
                </div>
              </div>
            </div>
          </div>
          <DesktopFooter />
        </Default>
      </div>
    );
  }
}

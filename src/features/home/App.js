import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import * as authActions from '../auth/redux/actions';
import * as commonActions from '../common/redux/actions';
import {
  Desktop,
  Tablet,
  Mobile,
  DesktopHeader,
  DesktopFooter,
  DesktopSidebar,
  MobileHeader,
  MobileFooter,
  MobileMenu,
} from '../common';
import { LoadingData } from '../layout';
import { initAxios } from '../../common';

/*
  This is the root component of your app. Here you define the overall layout
  and the container of the react router.
  You should adjust it according to the requirement of your app.
*/
export class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      menuDataOpen: false,
    };
    this.onToggle = this.onToggle.bind(this);
    this.onGeo = this.onGeo.bind(this);
  }

  componentDidMount() {
    initAxios();
    if (this.props.auth.authenticated) {
      this.props.actions.loadAll();
    } else {
      // Check auth...
      this.props.actions.checkIsAuthenticated();
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.onGeo);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.auth.authenticated &&
      !nextProps.home.loadAllFinish &&
      !nextProps.home.loadAllError &&
      !nextProps.home.loadAllPending
    ) {
      initAxios(nextProps.auth.token);
      nextProps.actions.loadAll();
    }
  }

  onGeo(position) {
    if (position && position.coords) {
      this.props.actions.setCoords({ lat: position.coords.latitude, lon: position.coords.longitude})
    }
    console.log(position);
  }

  onToggle() {
    this.setState({ menuDataOpen: !this.state.menuDataOpen });
  }

  render() {
    if (this.props.home.loadAllError) {
      return (
        <div class="text-danger">
          <span>Erreur d'accès au service</span>
        </div>
      );
    } else {
      if (!this.props.auth.authenticated || this.props.home.loadAllFinish) {
        return (
          <div className="full-page">
            <Tablet>
              <div className="display-tablet">Tablet @TODO</div>
            </Tablet>
            <Mobile>
              <div className="display-mobile">
                <MobileHeader />
                <div id="page-content-wrapper" className="">
                  {this.props.children}
                </div>
                {this.state.menuDataOpen && <MobileMenu onToggle={this.onToggle} />}
                <MobileFooter onToggle={this.onToggle} />
              </div>
            </Mobile>
            <Desktop>
              <div className="display-desktop">
                <DesktopHeader />
                <DesktopSidebar />
                <div
                  id="page-content-wrapper"
                  className={classnames(this.props.common.sidebar && 'page-content-wrapper-menu')}
                >
                  {this.props.children}
                </div>
                <DesktopFooter />
              </div>
            </Desktop>
          </div>
        );
      } else {
        return (
          <div className="main-loader">
            <p>... Chargement ...</p>
            <LoadingData />
          </div>
        );
      }
    }
  }
}

function mapStateToProps(state) {
  return {
    home: state.home,
    auth: state.auth,
    common: state.common,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, ...authActions, ...commonActions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

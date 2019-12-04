import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import * as authActions from '../auth/redux/actions';
import { DesktopHeader, DesktopFooter, DesktopSidebar } from '../../features/common';
import { MobileHeader, MobileFooter, MobileMenu } from '../../features/common';
import { LoadingData } from '../layout';
import { Desktop, Tablet, Mobile } from '../common'
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
      menuDataOpen: false
    };
    this.onToggle = this.onToggle.bind(this);
  }

  componentDidMount() {
    initAxios();
    if (this.props.auth.authenticated) {
      this.props.actions.loadAll();
    } else {
      // Check auth...
      this.props.actions.checkIsAuthenticated();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.authenticated && !nextProps.home.loadAllFinish && !nextProps.home.loadAllError && !nextProps.home.loadAllPending) {
      initAxios(nextProps.auth.token);
      nextProps.actions.loadAll();
    }
  }

  onToggle () {
    this.setState({menuDataOpen: !this.state.menuDataOpen});
  }

  render() {
    return (
      <div>
        {this.props.home.loadAllError ? (  
          <div class="text-danger">
            <span>Erreur d'accès au service</span>
          </div>
        ) : (
          <div>
            {(!this.props.auth.authenticated || this.props.home.loadAllFinish) ? (  
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
                  <DesktopHeader />
                  <DesktopSidebar />
                  <div id="page-content-wrapper" className={classnames(this.props.common.sidebar && "page-content-wrapper-menu",  "w-100")}>
                    {this.props.children}
                  </div>
                  <DesktopFooter />
                </Desktop>
              </div>
            ) : (
              <div className="main-loader">
                <p>... Chargement ...</p>
                <LoadingData />
              </div>
            )
          }
        </div>
      )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    home: state.home,
    auth: state.auth,
    common: state.common
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, ...authActions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
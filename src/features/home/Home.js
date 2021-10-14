import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ResponsiveContent, Row, Col } from 'react-bootstrap-front';
import * as actions from './redux/actions';
import { HomeTimeline, Statistics } from './';
import { Signin } from '../auth';
import { Copyright } from '../ui';

import logo from '../../images/logo-les-eco-pattes.jpg';
import logoPied from '../../images/basPageHome.png';

export class Home extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <ResponsiveContent className="home-home h-100">
        {this.props.auth.authenticated ? (
          <div className="home-home-inner text-center">
            <br />
            <h2 className="home-title">Bienvenue sur l'application de gestion de l'éco-pâturage</h2>
            <br />
            <br />
            <img className="logo-ecopattes" src={logo} alt="" />
            <br />
            <br />
            <Copyright />
          </div>
        ) : (
          <div className="home-home-wrapper h-100">
            <Row className="h-100">
              <Col size={{ xs: 0, sm: 24 }}>
                <div className="home-home-inner text-center custom-scrollbar">
                  <div>
                    <br />
                    <h2 className="home-title">Pensez à l'éco-pâturage</h2>
                    <h2 className="home-title">pour entretenir vos espaces verts et naturels.</h2>
                    <br />
                    <h3 className="home-title">Avec</h3>
                    <br />
                    <img className="logo-ecopattes" src={logo} alt="" />
                    <br />
                    <br />
                    <h2 className="home-title2">les moutons seront bien gardés !</h2>
                  </div>
                  <br />
                  <br />
                  <HomeTimeline />
                  <br />
                  <br />
                  <Statistics stats={this.props.dashboard.stats} />
                  <br />
                  <br />
                  <img src={logoPied} alt="Pied de page" />
                </div>
              </Col>
              <Col size={{ xs: 36, sm: 12 }}>
                <div className="home-signin-wrapper">
                  <Signin />
                </div>
              </Col>
            </Row>
          </div>
        )}
      </ResponsiveContent>
    );
  }
}

function mapStateToProps(state) {
  return {
    home: state.home,
    auth: state.auth,
    dashboard: state.dashboard,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

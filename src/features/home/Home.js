import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import reactLogo from '../../images/react-logo.svg';
import rekitLogo from '../../images/rekit-logo.svg';
import * as actions from './redux/actions';
import { Desktop, Tablet, Mobile, Default } from '../common'
import fond from '../../images/fond2.jpg';
import logo from '../../images/logo-les-eco-pattes.jpg';
import {Stats} from '../dashboard';

export class Home extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="container-fluid">
        <Mobile>
          {this.props.auth.authenticated ? (
            <Stats />
          ) : (
          <div className="text-center">
            <br />
            <h5>Pensez à l'éco-pâturage pour entretenir vos espaces verts et naturels</h5>
            <br />
            <img src={logo} />
            <br />
            <br />
            <h6>les moutons seront bien gardés !</h6>
          </div>
          )}
        </Mobile>
        <Desktop>
            <div className="text-center">
              <img className="fond-site" src={fond} />
              <br />
              <br />
              <br />
              <Stats />
            </div>
        </Desktop>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
    auth: state.auth,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

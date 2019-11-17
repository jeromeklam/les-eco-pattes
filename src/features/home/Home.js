import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import reactLogo from '../../images/react-logo.svg';
import rekitLogo from '../../images/rekit-logo.svg';
import * as actions from './redux/actions';
import { Desktop, Tablet, Mobile, Default } from '../common'
import fond from '../../images/fond-les-eco-pattes.png';
import logo from '../../images/logo-les-eco-pattes.jpg';

export class Home extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="container">
        <Mobile>
          <div className="text-center">
            <br />
            <img src={logo} />
          </div>
        </Mobile>
        <Desktop>
          <div className="text-center">
            <br />
            <img src={fond} />
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
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

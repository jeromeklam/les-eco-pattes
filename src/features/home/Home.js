import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import fond from '../../images/fond2.jpg';
import logo from '../../images/logo-les-eco-pattes.jpg';

export class Home extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="text-center">
          <img className="fond-site d-none d-sm-block" src={fond} alt="" />
          <br />
          <h5 className="home-title">Pensez à l'éco-pâturage pour entretenir vos espaces verts et naturels</h5>
          <br />
          <img className="logo-ecopattes" src={logo} alt="" />
          <br />
          <br />
          <h6 className="home-title2">les moutons seront bien gardés !</h6>
        </div>
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

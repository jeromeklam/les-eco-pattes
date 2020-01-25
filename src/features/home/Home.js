import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Responsive } from 'freeassofront';
import fond from '../../images/fond2.jpg';
import logo from '../../images/logo-les-eco-pattes.jpg';
import { Stats } from '../dashboard';

export class Home extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="container-fluid">
        <Responsive displayIn={['Mobile']}>
          {this.props.auth.authenticated ? (
            <Stats />
          ) : (
            <div className="text-center">
              <br />
              <h5>Pensez à l'éco-pâturage pour entretenir vos espaces verts et naturels</h5>
              <br />
              <img src={logo} alt="" />
              <br />
              <br />
              <h6>les moutons seront bien gardés !</h6>
            </div>
          )}
        </Responsive>
        <Responsive displayIn={['Laptop', 'Tablet']}>
          <div className="text-center">
            <img className="fond-site" src={fond} alt="" />
            <br />
            <br />
            <br />
            <Stats />
          </div>
        </Responsive>
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

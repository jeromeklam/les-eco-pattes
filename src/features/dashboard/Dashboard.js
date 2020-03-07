import React, { Component } from 'react';
import { Responsive } from 'freeassofront';
import fond from '../../images/fond2.jpg';
import logo from '../../images/logo-les-eco-pattes.jpg';
import { Stats } from '../dashboard';
import { DashboardAlerts } from '../alert';
import { PendingMovements } from '../cause-movement';
import { PendingSicknesses } from '../cause-sickness'
import { DashboardGrid } from './';

export default class Dashboard extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="container-fluid">
        <Responsive displayIn={['Mobile']}>
          <div className="text-center">
            <br />
            <h5>Pensez à l'éco-pâturage pour entretenir vos espaces verts et naturels</h5>
            <br />
            <img src={logo} alt="" />
            <br />
            <br />
            <h6>les moutons seront bien gardés !</h6>
          </div>
        </Responsive>
        <Responsive displayIn={['Laptop', 'Tablet']}>
          <div className="text-center">
            <img className="fond-site" src={fond} alt="" />
            <br />
            <DashboardGrid />
          </div>
        </Responsive>
      </div>
    );
  }
}

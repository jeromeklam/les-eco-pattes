import React, { Component } from 'react';
import { Copyright } from '../common';

export default class About extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="about-about container">
        <div class="jumbotron p-9 p-md-15 text-white rounded bg-primary">
          <div class="col-md-36 px-0">
            <h1 class="display-32 font-italic">Application de gestion pour les Eco-Pattes</h1>
            <p class="lead my-24">
              Cette application est réservée aux Eco-Pattes. Si vous souhaitez avoir plus
              d'informations merci d'utiliser les informations de contact ci-dessous.
            </p>
            <p class="lead mb-0">
              <a href="#" class="text-white font-weight-bold">
                
              </a>
            </p>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-md-18"></div>
          <div className="col-md-18">
            <div className="card flex-md-row mb-4 box-shadow h-md-250">
              <div class="card-body d-flex flex-column align-items-start">
                <strong class="d-inline-block mb-2 text-primary">Les Eco-Pattes</strong>
                <h3 class="mb-0">
                  <a class="text-dark" href="#">
                    Contact
                  </a>
                </h3>
                <p class="card-text mb-auto">24, rue Jean-Claude Ponsard</p>
                <p class="card-text mb-auto">57950 Montigny-lès-Metz</p>
                <p class="card-text mb-auto">06 29 33 52 12</p>
                <p class="card-text mb-auto">
                  <a href="mailto:contact@lesecopattes.fr">contact@lesecopattes.fr</a>
                </p>
                <a href="http://lesecopattes.fr" target="_blank">
                  Notre site internet
                </a>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <Copyright />
      </div>
    );
  }
}

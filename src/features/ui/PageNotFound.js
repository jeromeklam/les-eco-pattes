import React, { Component } from 'react';

export default class PageNotFound extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="ui-page-not-found text-center mt-5">
        <div class="container">
          <div class="row">
            <div class="col-md-w36 text-center">
              <div class="error-template">
                <h1>Oops!</h1>
                <h2>404 Page non trouvée !</h2>
                <div class="error-details">
                  Désolé, il y a eu une erreur, la page n'a pas été trouvée !
                </div>
                <div class="error-actions mt-5">
                  <a href="/" class="btn btn-primary btn-lg">
                    <span class="glyphicon glyphicon-home"></span>
                    Retour à l'accueil{' '}
                  </a>
                  <a href="/" class="btn btn-default btn-lg">
                    <span class="glyphicon glyphicon-envelope"></span> Contacter le support{' '}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

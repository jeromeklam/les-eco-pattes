import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { SocialIcon } from 'react-social-icons';
import { ResponsiveContent } from 'react-bootstrap-front';
import { Copyright } from '../ui';
import logo from '../../images/logo-les-eco-pattes.jpg';

class About extends Component {
  static propTypes = {};

  render() {
    const { intl } = this.props;
    return (
      <ResponsiveContent className="about-about">
        <div className="container pt-5">
          <div className="jumbotron p-9 p-md-15 text-white rounded bg-primary">
            <div className="col-md-36 px-0">
              <h1 className="display-32 font-italic">
                <FormattedMessage
                  id="app.features.about.about.application"
                  defaultMessage="Application for les-eco-pattes"
                />
              </h1>
              <p className="lead my-24">
                <FormattedMessage
                  id="app.features.about.about.explanation"
                  defaultMessage="Only for les-eco-pattes"
                />
              </p>
              <p className="lead mb-0">
              </p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-18"><img src={logo} alt="" /></div>
            <div className="col-md-18">
              <div className="card flex-md-row mb-4 box-shadow h-md-250">
                <div className="card-body d-flex flex-column align-items-start">
                  <strong className="d-inline-block mb-2 text-primary">
                    <FormattedMessage
                      id="app.contact.name"
                      defaultMessage="KLAM Jérôme"
                    />
                    </strong>
                  <h3 className="mb-0">
                    <a className="text-dark">
                      Contact
                    </a>
                  </h3>
                  <p className="card-text mb-auto">
                    <FormattedMessage
                      id="app.contact.address1"
                      defaultMessage="11, Rue de la Marne"
                    />
                  </p>
                  <p className="card-text mb-auto">
                    <FormattedMessage
                      id="app.contact.address2"
                      defaultMessage="57050 Le Ban St Martin"
                    />
                  </p>
                  <p className="card-text mb-auto">
                    <FormattedMessage
                      id="app.contact.tel"
                      defaultMessage="00 33 6 51 81 70 28"
                    />
                  </p>
                  <div className="row">
                    <div classNale="col-26"> 
                      <p className="card-text mb-auto">
                        <a href={"mailto:" + intl.formatMessage({ id: 'app.contact.email', defaultMessage: 'jeromeklam@free.fr' })}>
                          <FormattedMessage
                            id="app.contact.email"
                            defaultMessage="jeromeklam@free.fr"
                          />
                        </a>
                      </p>
                      <a href={intl.formatMessage({ id: 'app.contact.site', defaultMessage: 'https://freeasso.fr' })} target="_blank" rel="noopener noreferrer">
                        <FormattedMessage
                          id="app.contact.site"
                          defaultMessage="https://freeasso.fr"
                        />
                      </a>
                    </div>
                    <div className="col-10">
                      <SocialIcon url="https://facebook.com/Les-éco-pattes-140387953308320/" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <Copyright />
        </div>
      </ResponsiveContent>
    );
  }
}

export default injectIntl(About);
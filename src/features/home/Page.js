import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { injectIntl, FormattedMessage } from 'react-intl';
import Avatar from 'react-avatar';
import { push } from 'connected-react-router';
import cookie from 'react-cookies';
import { ResponsivePage, CookieConsent } from 'react-bootstrap-front';
import { HeaderBadge as InboxBadge } from '../inbox';

import { globalMenu } from './';
import * as actions from './redux/actions';
import * as authActions from '../auth/redux/actions';
import * as commonActions from '../common/redux/actions';
import {
  Menu as MenuIcon,
  MenuOpened as MenuOpenedIcon,
  MenuClosed as MenuClosedIcon,
  AccountClose,
  SocketConnected,
  SocketDisconnected,
} from '../icons';
import { getFullName } from '../user';
import { SimpleForm } from '../auth';
import { CenteredLoading9X9 } from '../ui';
import { RightPanel } from '../common';
import fondAuth from '../../images/fond2.jpg';
import fond from '../../images/fondAccueil.jpg';

export class Page extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      authCookie: this.getAuthCookie(),
    };
    this.onAccept = this.onAccept.bind(this);
    this.onNavigate = this.onNavigate.bind(this);
    this.onLocaleChange = this.onLocaleChange.bind(this);
    this.onChangeSettings = this.onChangeSettings.bind(this);
  }

  onChangeSettings(setting, value) {
    this.props.actions.changeSetting('layout', setting, value);
  }

  onLocaleChange(locale) {
    this.props.actions.setLocale(locale);
  }

  onNavigate(url) {
    this.props.actions.push(url);
  }

  getAuthCookie() {
    let auth = false;
    if (cookie.load('FREEASSO_COOKIE')) {
      auth = cookie.load('FREEASSO_COOKIE');
    }
    return auth;
  }

  onAccept() {
    let aYearFromNow = new Date();
    aYearFromNow.setFullYear(aYearFromNow.getFullYear() + 1);
    cookie.save('FREEASSO_COOKIE', true, { path: '/', expires: aYearFromNow });
    this.setState({ authCookie: true });
  }

  onDecline() {
    window.location = 'https://www.lilo.org';
  }

  render() {
    const { authCookie } = this.state;
    const icons = [];
    let globalBadges = [];
    if (this.props.auth.authenticated) {
      globalBadges = [];
      if (this.props.home.socketOn) {
        if (this.props.home.socketConnected) {
          icons.push({
            name: 'socket',
            label: 'Synchronisation serveur activée',
            icon: <SocketConnected className="text-success" />,
          });
        } else {
          icons.push({
            name: 'socket',
            label: 'Erreur de synchronisation serveur',
            icon: <SocketDisconnected className="text-danger" />,
          });
        }
      }
    }
    const appMenu = globalMenu(authCookie);
    return (
      <div className="home-page">
        <img
          className={classnames(
            'd-none',
            this.props.auth.authenticated ? 'fond-siteAuth' : 'fond-site',
          )}
          src={this.props.auth.authenticated ? fondAuth : fond}
          alt=""
        />
        <ResponsivePage
          menuIcon={<MenuIcon className="light" />}
          title={process.env.REACT_APP_APP_NAME}
          options={appMenu}
          icons={icons}
          scope={this.props.auth.user ? this.props.auth.user.user_scope : ''}
          badges={globalBadges}
          settings={{ ...this.props.auth.settings.layout }}
          authenticated={this.props.auth.authenticated}
          location={this.props.location}
          onNavigate={this.onNavigate}
          onChangeSettings={this.onChangeSettings}
          userForm={<SimpleForm />}
          accountOpened={<AccountClose size="38" />}
          accountClosed={
            this.props.auth.user ? (
              <Avatar
                className="rounded-circle avatar-header"
                email={
                  (!this.props.auth.user.user_avatar || this.props.auth.user.user_avatar === '') &&
                  this.props.auth.user.user_email
                }
                name={getFullName(this.props.auth.user)}
                src={
                  this.props.auth.user.user_avatar && this.props.auth.user.user_avatar !== ''
                    ? `data:image/jpeg;base64,${this.props.auth.user.user_avatar}`
                    : null
                }
                size="38"
              />
            ) : null
          }
          menuOpened={<MenuOpenedIcon />}
          menuClosed={<MenuClosedIcon />}
          rightPanel={this.props.auth.authenticated ? <RightPanel /> : null}
          onRightPanelToggle={this.props.actions.toggleRightPanel}
          rightPanelOpened={this.props.common.rightPanelOpened}
          footer={!this.props.auth.authenticated}
          t={this.props.intl.formatMessage}
        >
          {this.props.auth.firstCheck &&
          (!this.props.auth.authenticated || this.props.home.loadAllFinish) ? (
            <div>{this.props.children}</div>
          ) : (
            <div className="text-center mt-5 text-secondary">
              <h4>
                <FormattedMessage
                  id="app.features.home.app.loading"
                  defaultMessage="... Loading ..."
                />
              </h4>
              <CenteredLoading9X9 />
            </div>
          )}
        </ResponsivePage>
        {!authCookie && (
          <CookieConsent
            title={
              <FormattedMessage
                id="app.features.home.cookie.consent.title"
                defaultMessage="Cookie consent"
              />
            }
            text={
              <FormattedMessage
                id="app.features.home.cookie.consent.text"
                defaultMessage="Cookie consent"
              />
            }
            accept={
              <FormattedMessage
                id="app.features.home.cookie.consent.accept"
                defaultMessage="Cookie consent"
              />
            }
            decline={
              <FormattedMessage
                id="app.features.home.cookie.consent.decline"
                defaultMessage="Cookie consent"
              />
            }
            onAccept={this.onAccept}
            onDecline={this.onDecline}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    common: state.common,
    causeTypes: state.causeType.items || [],
    home: state.home,
    inbox: state.inbox,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, ...authActions, ...commonActions, push }, dispatch),
  };
}

export default injectIntl(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Page),
);

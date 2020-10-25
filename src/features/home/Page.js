import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';
import Avatar from 'react-avatar';
import * as actions from './redux/actions';
import * as authActions from '../auth/redux/actions';
import { ResponsivePage } from 'react-bootstrap-front';
import fond from '../../images/fond2.jpg';
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
import { appMenu } from './';

export class Page extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: '',
  };

  constructor(props) {
    super(props);
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
    this.props.history.push(url);
  }

  render() {
    const icons = [];
    if (this.props.home.socketOn && this.props.auth.authenticated) {
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
    //email={this.props.auth.user.user_email}
    return (
      <div className="home-page">
        <img className="fond-site2 d-none d-sm-block" src={fond} alt="" />
        <ResponsivePage
          menuIcon={<MenuIcon className="light" />}
          title={process.env.REACT_APP_APP_NAME}
          options={appMenu}
          icons={icons}
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
                email={(!this.props.auth.user.user_avatar || this.props.auth.user.user_avatar === '') && this.props.auth.user.user_email}
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
          footer={!this.props.auth.authenticated}
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    home: state.home,
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, ...authActions }, dispatch),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Page));

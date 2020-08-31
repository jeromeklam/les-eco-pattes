import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { IntlProvider, FormattedMessage } from 'react-intl';
import * as actions from './redux/actions';
import * as authActions from '../auth/redux/actions';
import { ResponsivePage } from 'freeassofront';
import {
  Menu as MenuIcon,
  AccountDetail,
  AccountClose,
  SocketConnected,
  SocketDisconnected,
  MenuOpened as MenuOpenedIcon,
  MenuClosed as MenuClosedIcon,
} from '../icons';
import { CenteredLoading9X9 } from '../ui';
import { SimpleForm } from '../auth';
import {
  initAxios,
  initSocket,
  propagateCreate,
  propagateUpdate,
  propagateDelete,
} from '../../common';
import fond from '../../images/fond2.jpg';
import messages_fr from '../../translations/fr.json';
import messages_en from '../../translations/en.json';
import { appMenu } from './';
import log from 'loglevel';

const intlMessages = {
  fr: messages_fr,
  en: messages_en,
};

export class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: '',
  };

  constructor(props) {
    super(props);
    this.onNavigate = this.onNavigate.bind(this);
    this.onChangeSettings = this.onChangeSettings.bind(this);
    this.onGeo = this.onGeo.bind(this);
    this.state = {
      mySocket: initSocket(),
    };
    log.getLogger("freejsonapi.jsonApiNormalizer").setLevel("WARN");
    log.getLogger("freeassofront.inputMask").setLevel("WARN");
    log.getLogger("freeassofront.inputSelect").setLevel("WARN");
  }

  componentDidMount() {
    initAxios();
    if (this.props.auth.authenticated) {
      this.props.actions.loadAll();
    } else {
      // Check auth...
      this.props.actions.checkIsAuthenticated();
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.onGeo);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { propagateCreate, propagateUpdate, propagateDelete } = this.props.actions;
    if (prevProps.auth.authenticated !== this.props.auth.authenticated || prevProps.home.socketOn !== this.props.home.socketOn) {
      if (
        this.props.auth.authenticated &&
        !this.props.home.loadAllFinish &&
        !this.props.home.loadAllError &&
        !this.props.home.loadAllPending
      ) {
        initAxios(prevProps.auth.token);
        this.props.actions.loadAll();
        if (this.props.home.socketOn) {
          const options = {
            onConnected: this.props.actions.socketConnected,
            onDisconnected: this.props.actions.socketDisconnected,
            subscriptions: {
              storage_create: datas => {
                if (datas && datas.details) {
                  if (datas.details.datas) {
                    propagateCreate(datas.details.type, datas.details.id, datas.details.datas);
                  }
                }
              },
              storage_update: datas => {
                if (datas && datas.details) {
                  if (datas.details.datas) {
                    propagateUpdate(datas.details.type, datas.details.id, datas.details.datas);
                  }
                }
              },
              storage_delete: datas => {
                if (datas && datas.details) {
                  if (datas.details.datas) {
                    propagateDelete(datas.details.type, datas.details.id, null);
                  }
                }
              },
            }
          };
          const socket = initSocket(options);
          this.props.actions.initSocket(socket);
        } else {
          this.props.actions.closeSocket();
        }
      } else {
        this.props.actions.closeSocket();
      }
    }
  }

  onGeo(position) {
    if (position && position.coords) {
      this.props.actions.setCoords({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    }
  }

  onNavigate(url) {
    this.props.history.push(url);
  }

  onChangeSettings(setting, value) {
    this.props.actions.changeSetting('layout', setting, value);
  }

  render() {
    const locale = this.props.home.locale || 'fr';
    const messages = intlMessages[locale];
    const icons = [];
    if (this.props.home.socketOn && this.props.auth.authenticated) {
      if (this.props.home.socketConnected) {
        icons.push(
          {
            name: 'socket',
            label: 'Synchronisation serveur activée',
            icon: <SocketConnected className="text-success"/>
          }
        );
      } else {
        icons.push(
          {
            name: 'socket',
            label: 'Erreur de synchronisation serveur',
            icon: <SocketDisconnected className="text-danger"/>
          }
        );
      }
    }
    if (this.props.home.loadAllError) {
      return (
        <IntlProvider locale={locale} messages={messages}>
          <div className="text-danger">
            <h4>
              <FormattedMessage
                id="app.features.home.app.error"
                defaultMessage="... Service unavailable ..."
              />
            </h4>
          </div>
        </IntlProvider>
      );
    } else {
      return (
        <IntlProvider locale={locale} messages={messages}>
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
            userTitle={this.props.auth.user.user_first_name || this.props.auth.user.user_last_name}
            accountOpened={<AccountClose />}
            accountClosed={<AccountDetail className="text-primary" />}
            menuOpened={<MenuOpenedIcon />}
            menuClosed={<MenuClosedIcon />}
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
        </IntlProvider>
      );
    }
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
    actions: bindActionCreators(
      { ...actions, ...authActions, propagateCreate, propagateUpdate, propagateDelete },
      dispatch,
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

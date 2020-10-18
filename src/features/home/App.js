import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { IntlProvider, FormattedMessage } from 'react-intl';
import * as actions from './redux/actions';
import * as authActions from '../auth/redux/actions';
import {
  initSocket,
  propagateCreate,
  propagateUpdate,
  propagateDelete,
} from '../../common';
import messages_fr from '../../translations/fr.json';
import messages_en from '../../translations/en.json';
import log from 'loglevel';
import { Page } from './';

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
    let socket = null;
    if (props.home.socketOn) {
      socket = initSocket();
    }
    this.state = {
      mySocket: socket,
    };
    this.onGeo = this.onGeo.bind(this);
    log.getLogger("jsonapi-front.jsonApiNormalizer").setLevel("WARN");
    log.getLogger("react-bootstrap-front.inputMask").setLevel("WARN");
    log.getLogger("react-bootstrap-front.inputSelect").setLevel("WARN");
  }

  componentDidMount() {
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

  render() {
    const locale = this.props.home.locale || 'fr';
    const messages = intlMessages[locale];
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
          <Page {...this.props} locale={locale} />
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

import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Avatar from 'react-avatar';
import { injectIntl, FormattedMessage } from 'react-intl';
import * as actions from './redux/actions';
import { getJsonApi } from 'jsonapi-front';
import { InputText, InputPassword, InputSelect, Dropdown } from 'react-bootstrap-front';
import { setModelValue, propagateModel } from '../../common';
import { modifySuccess, messageSuccess, showErrors, InputJson, DropZone } from '../ui';
import { Camera as CameraIcon } from '../icons';
import { langAsOptions } from '../lang';
import { getFullName } from '../user';
import { schema, defaultConfig } from './';

export class SimpleForm extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.auth.user !== state.user) {
      return { user: props.auth.user };
    }
    return null;
  }

  constructor(props) {
    super(props);
    let settings = defaultConfig;
    if (props.auth.settings) {
      try {
        settings = props.auth.settings || defaultConfig;
      } catch (ex) {
        settings = defaultConfig;
      }
    }
    this.state = {
      user: props.auth.user,
      settings: settings,
      activeTab: 1,
      old_password: '',
      password: '',
      password_error: null,
      password2: '',
      password2_error: null,
      menuAvatar: false,
      refAvatar: React.createRef(),
    };
    this.onChange = this.onChange.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onSubmitUser = this.onSubmitUser.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmitPassword = this.onSubmitPassword.bind(this);
    this.onChangeSettings = this.onChangeSettings.bind(this);
    this.onSubmitSettings = this.onSubmitSettings.bind(this);
    this.onChangeActiveTab = this.onChangeActiveTab.bind(this);
    this.onChangeAvatar = this.onChangeAvatar.bind(this);
    this.onMenuAvatar = this.onMenuAvatar.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onChangeUser(event) {
    let user = this.state.user;
    setModelValue(user, event.target.name, event.target.value);
    this.setState({ user: user });
  }

  onChangePassword(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onChangeSettings(event) {
    this.setState({ settings: event.target.value });
  }

  onSubmitUser(evt) {
    if (evt) {
      evt.preventDefault();
    }
    let obj = getJsonApi(this.state.user, 'FreeSSO_User', this.state.user.id);
    this.props.actions
      .updateOne(this.state.user.id, obj)
      .then(result => {
        modifySuccess();
        this.props.actions.propagateModel('FreeSSO_User', result);
      })
      .catch(errors => {
        showErrors(this.props.intl, errors, 'updateOneError');
      });
  }

  onSubmitSettings(evt) {
    if (evt) {
      evt.preventDefault();
    }
    const datas = {
      type: 'FreeSSO_ConfigRequest',
      config: JSON.stringify(this.state.settings),
      config_type: 'settings',
    };
    let obj = getJsonApi(datas);
    this.props.actions
      .updateConfig(obj)
      .then(result => {
        modifySuccess();
      })
      .catch(errors => {
        showErrors(this.props.intl, errors, 'updateOneError');
      });
  }

  onSubmitPassword(evt) {
    if (evt) {
      evt.preventDefault();
    }
    this.setState({ password_error: null, password2_error: null });
    const { intl } = this.props;
    let next = true;
    if (this.state.password === '') {
      const message1 = intl.formatMessage({
        id: 'app.features.auth.askPassword.error.emptyPassword',
        defaultMessage: 'Password is mandatory !',
      });
      this.setState({ password_error: message1 });
      next = false;
    }
    if (this.state.password2 === '') {
      const message2 = intl.formatMessage({
        id: 'app.features.auth.askPassword.error.emptyPassword2',
        defaultMessage: 'Password is mandatory !',
      });
      this.setState({ password2_error: message2 });
      next = false;
    }
    if (
      this.state.password !== '' &&
      this.state.password2 !== '' &&
      this.state.password !== this.state.password2
    ) {
      const message3 = intl.formatMessage({
        id: 'app.features.auth.askPassword.error.passwordDifferent',
        defaultMessage: 'Password is mandatory !',
      });
      this.setState({ password2_error: message3 });
      next = false;
    }
    if (next) {
      const datas = {
        type: 'FreeSSO_ChangePassword',
        password: this.state.password,
        password2: this.state.old_password,
      };
      let obj = getJsonApi(datas);
      this.props.actions
        .updatePassword(obj)
        .then(result => {
          this.setState({
            old_password: '',
            password: '',
            password2: '',
            password_error: null,
            password2_error: null,
          });
          messageSuccess(
            intl.formatMessage({
              id: 'app.features.auth.askPassword.changed',
              defaultMessage: 'Password changed !',
            }),
          );
          this.props.history.push('/');
        })
        .catch(errors => {
          const { intl } = this.props;
          showErrors(intl, this.props.auth.updatePasswordError);
        });
    }
    return next;
  }

  onChangeActiveTab(tab) {
    this.setState({ activeTab: tab });
  }

  onMenuAvatar() {
    this.setState({ menuAvatar: !this.state.menuAvatar });
  }

  onChangeAvatar(acceptedFiles) {
    this.onMenuAvatar();
    if (acceptedFiles !== null) {
      const promises = acceptedFiles.map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onabort = () => {
            reject();
          };
          reader.onerror = error => {
            reject(error);
          };

          reader.onload = () => {
            const binaryStr = reader.result;
            const event = {
              target: {
                name: 'user_avatar',
                value: binaryStr,
              },
            };
            this.onChangeUser(event);
          };
          reader.readAsDataURL(file);
        });
      });
      const reload = Promise.all(promises);
      reload.then(result => {
        //console.log('InputImage result', result);
      });
    } else {
      const event = {
        target: {
          name: 'user_avatar',
          value: null,
        },
      };
      this.onChangeUser(event);
    }
  }

  render() {
    const { user, activeTab } = this.state;
    //email={user.user_email}
    let userAvatar = user.user_avatar || '';
    if (userAvatar.indexOf('data:') < 0) {
      userAvatar = `data:image/jpeg;base64,${user.user_avatar}`;
    }
    if (this.props.auth.authenticated && this.props.home.loadAllFinish) {
      return (
        <div className="row pt-2">
          <div className="col-sm-10 text-center">
            <div className="avatar">
              <Avatar
                className="rounded-circle"
                name={getFullName(user)}
                src={userAvatar}
                size="150"
              />
              <button
                className="btn text-secondary avatar-change"
                ref={this.state.refAvatar}
                onClick={this.onMenuAvatar}
              >
                <CameraIcon />
              </button>
              {this.state.menuAvatar && (
                <Dropdown
                  myRef={this.state.refAvatar}
                  onClose={this.onMenuAvatar}
                  align="bottom-left"
                >
                  <div
                    className="bg-light border border-secondary text-secondary"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <button className="btn btn-block text-secondary">
                      <div className="drop-zone">
                        <DropZone
                          onDrop={acceptedFiles => {
                            this.onChangeAvatar(acceptedFiles);
                          }}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <section>
                              <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <FormattedMessage
                                  id="app.features.auth.user.avatar.update"
                                  defaultMessage="Modifier"
                                />
                              </div>
                            </section>
                          )}
                        </DropZone>
                      </div>
                    </button>
                    <button
                      type="button"
                      className="text-secondary dropdown-item"
                      onClick={() => this.onChangeAvatar(null)}
                    >
                      <FormattedMessage
                        id="app.features.auth.user.avatar.remove"
                        defaultMessage="Supprimer"
                      />
                    </button>
                  </div>
                </Dropdown>
              )}
            </div>
            <p className="pt-3">{user.user_login}</p>
          </div>
          <div className="col-20">
            <div className="tab-content pl-5 pr-5" id="v-pills-tabContent">
              {activeTab === 1 && (
                <form
                  className="auth-simple-form"
                  style={this.props.style}
                  onSubmit={this.onSubmitUser}
                >
                  <InputText
                    label={<FormattedMessage id="app.user.firstname" defaultMessage="Firstname" />}
                    name="user_first_name"
                    value={user.user_first_name}
                    labelTop
                    onChange={this.onChangeUser}
                  />
                  <InputText
                    label={<FormattedMessage id="app.user.lastname" defaultMessage="Lastname" />}
                    name="user_last_name"
                    value={user.user_last_name}
                    labelTop
                    onChange={this.onChangeUser}
                  />
                  <InputText
                    label={<FormattedMessage id="app.user.email" defaultMessage="Email" />}
                    name="user_last_name"
                    value={user.user_email}
                    labelTop
                    onChange={this.onChangeUser}
                  />
                  <InputSelect
                    label={<FormattedMessage id="app.user.lang" defaultMessage="Language" />}
                    name="lang.id"
                    value={user.lang.id}
                    labelTop
                    onChange={this.onChangeUser}
                    options={langAsOptions(this.props.lang.items, ['en', 'fr'])}
                  />
                  <div className="text-right">
                    <button className="btn btn-primary">
                      {<FormattedMessage id="app.features.auth.form.save" defaultMessage="Save" />}
                    </button>
                  </div>
                </form>
              )}
              {activeTab === 2 && (
                <form onSubmit={this.onSubmitSettings}>
                  <InputJson
                    name="user_cache"
                    value={JSON.parse(user.config.ubrk_config)}
                    labelTop
                    onChange={this.onChangeSettings}
                    schema={schema}
                  />
                  <div className="text-right">
                    <button type="submit" className="btn btn-success btn-submit">
                      <span>
                        {
                          <FormattedMessage
                            id="app.features.auth.form.save"
                            defaultMessage="Save"
                          />
                        }
                      </span>
                    </button>
                  </div>
                </form>
              )}
              {activeTab === 3 && (
                <form
                  className="auth-simple-form"
                  style={this.props.style}
                  onSubmit={this.onSubmitPassword}
                >
                  <InputPassword
                    label={
                      <FormattedMessage
                        id="app.features.auth.form.oldPassword"
                        defaultMessage="Old password"
                      />
                    }
                    name="old_password"
                    value={this.state.old_password}
                    labelTop
                    required
                    onChange={this.onChangePassword}
                  />
                  <InputPassword
                    label={
                      <FormattedMessage
                        id="app.features.auth.form.password"
                        defaultMessage="Password"
                      />
                    }
                    name="password"
                    value={this.state.password}
                    labelTop
                    required
                    error={this.state.password_error}
                    onChange={this.onChangePassword}
                  />
                  <InputPassword
                    label={
                      <FormattedMessage
                        id="app.features.auth.form.password2"
                        defaultMessage="Confirm password"
                      />
                    }
                    name="password2"
                    value={this.state.password2}
                    labelTop
                    required
                    error={this.state.password2_error}
                    onChange={this.onChangePassword}
                  />
                  <div className="text-right">
                    <button type="submit" className="btn btn-success btn-submit">
                      <span>
                        {
                          <FormattedMessage
                            id="app.features.auth.form.save"
                            defaultMessage="Save"
                          />
                        }
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
          <div className="col-6" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <button
              className={classnames(
                'btn btn-block',
                activeTab === 1 ? 'btn-outline-primary active' : 'text-secondary',
              )}
              onClick={() => {
                this.onChangeActiveTab(1);
              }}
            >
              <FormattedMessage id="app.features.auth.form.tabIdentity" defaultMessage="Identity" />
            </button>
            <button
              className={classnames(
                'btn btn-block',
                activeTab === 3 ? 'btn-outline-primary active' : 'text-secondary',
              )}
              onClick={() => {
                this.onChangeActiveTab(3);
              }}
            >
              <FormattedMessage
                id="app.features.auth.form.tabPassword"
                defaultMessage="Change password"
              />
            </button>
            <button
              className={classnames(
                'btn btn-block',
                activeTab === 2 ? 'btn-outline-primary active' : 'text-secondary',
              )}
              onClick={() => {
                this.onChangeActiveTab(2);
              }}
            >
              <FormattedMessage id="app.features.auth.form.tabSettings" defaultMessage="Settings" />
            </button>
          </div>
        </div>
      );
    }
    return null;
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    home: state.home,
    lang: state.lang,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(SimpleForm));

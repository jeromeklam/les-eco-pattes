import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Avatar from 'react-avatar';
import { injectIntl, FormattedMessage } from 'react-intl';
import * as actions from './redux/actions';
import { getJsonApi } from 'jsonapi-front';
import { InputText, InputSelect, Dropdown } from 'react-bootstrap-front';
import { setModelValue, propagateModel } from '../../common';
import { modifySuccess, showErrors, DropZone } from '../ui';
import { Camera as CameraIcon } from '../icons';
import { langAsOptions } from '../lang';
import { getFullName } from '../user';
import { PasswordTab, SettingsTab } from './';

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
    this.state = {
      user: props.auth.user,
      activeTab: 1,
      menuAvatar: false,
      refAvatar: React.createRef(),
    };
    this.onChange = this.onChange.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onSubmitUser = this.onSubmitUser.bind(this);
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
        this.props.onClose && this.props.onClose();
      })
      .catch(errors => {
        showErrors(this.props.intl, errors, 'updateOneError');
      });
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
    let userAvatar = user.user_avatar || '';
    if (userAvatar !== '' && userAvatar.indexOf('data:') < 0) {
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
                email={userAvatar === '' && user.user_email}
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
                    <button className="text-secondary dropdown-item">
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
                <SettingsTab onChangeTab={() => this.onChangeActiveTab(1)} onClose={this.props.onClose}/>
              )}
              {activeTab === 3 && (
                <PasswordTab onChangeTab={() => this.onChangeActiveTab(1)} onClose={this.props.onClose}/>
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

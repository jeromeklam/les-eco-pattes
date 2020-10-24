import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import * as actions from './redux/actions';
import { getJsonApi } from 'jsonapi-front';
import { propagateModel } from '../../common';
import {
  modifySuccess,
  showErrors,
  InputJson,
} from '../ui';
import { schema, defaultConfig } from './';

export class SettingsTab extends Component {
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
    };
    this.onChangeSettings = this.onChangeSettings.bind(this);
    this.onSubmitSettings = this.onSubmitSettings.bind(this);
  }

  onChangeSettings(event) {
    this.setState({ settings: event.target.value });
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
        this.props.actions.propagateModel('FreeSSO_User', result);
        this.props.onChangeTab(1);
        this.props.onClose && this.props.onClose();
      })
      .catch(errors => {
        showErrors(this.props.intl, errors, 'updateOneError');
      });
  }

  render() {
    const { user } = this.state;
    return (
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
              {<FormattedMessage id="app.features.auth.form.save" defaultMessage="Save" />}
            </span>
          </button>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(SettingsTab));

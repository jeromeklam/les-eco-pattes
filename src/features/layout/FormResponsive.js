import React, { Component } from 'react';
import classnames from 'classnames';
import { ButtonSubmit, ButtonCancel } from '../layout';
import { Desktop, Mobile } from '../common';
import TabIcon from '../icons/Tab';

export default class FormResponsive extends Component {
  static propTypes = {};

  render() {
    return (
      <form className="layout-form-responsive">
        <div className="card">
          <div className="card-header">
            <Desktop>
              <div className="float-right">
                <span className="navbar-brand">{this.props.title}</span>
              </div>
              {this.props.tabs && this.props.tabs.length > 0 && (
                <ul className="nav nav-tabs">
                  {this.props.tabs &&
                    this.props.tabs.map(oneTab => {
                      return (
                        <li key={oneTab.key} data-id={oneTab.key} className="nav-item">
                          <a
                            className={classnames(
                              'nav-link',
                              (this.props.tab === oneTab.key) && 'active',
                            )}
                            onClick={() => {
                              this.props.onNavTab(oneTab.key);
                            }}
                          >
                            {oneTab.label}
                          </a>
                        </li>
                      );
                    })}
                </ul>
              )}
            </Desktop>
            <Mobile>
              <div>
                <span className="navbar-brand">{this.props.title}</span>
              </div>
              <ul className="nav">
                {this.props.tabs &&
                  this.props.tabs.map(oneTab => {
                    return (
                      <li key={oneTab.key} className="nav-item">
                        <a
                          className="nav-link"
                          href="#"
                          onClick={() => {
                            this.props.onNavTab(oneTab.key);
                          }}
                        >
                          {oneTab.icon && <TabIcon name={oneTab.icon} />}
                          {oneTab.icon == '' && oneTab.shortcut}
                        </a>
                      </li>
                    );
                  })}
                <li className="nav-item">
                  <ButtonSubmit icon={true} label={false} onClick={this.props.onSubmit} />
                </li>
                <li className="nav-item">
                  <ButtonCancel icon={true} label={false} onClick={this.props.onCancel} />
                </li>
              </ul>
            </Mobile>
          </div>
          <div className="card-body">{this.props.children}</div>
          <Desktop>
            <div className="card-footer text-right">
              <ButtonSubmit icon={false} label={true} onClick={this.props.onSubmit} />
              &nbsp;
              <ButtonCancel icon={false} label={true} onClick={this.props.onCancel} />
            </div>
          </Desktop>
        </div>
      </form>
    );
  }
}

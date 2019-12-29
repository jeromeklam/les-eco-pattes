import React, { Component } from 'react';
import classnames from 'classnames';
import { ButtonSubmit, ButtonCancel, ButtonTab } from '../layout';
import { Desktop, Mobile } from '../common';
import TabIcon from '../icons/Tab';
import { ButtonPrevious, ButtonNext } from './';
import PreviousIcon from '../icons/Previous';
import NextIcon from '../icons/Next';
import { Link } from 'react-router-dom';

export default class FormResponsive extends Component {
  static propTypes = {};

  render() {
    return (
      <form className="layout-form-responsive">
        <Mobile>
          <div className="mobile-navbar">
            <span className="navbar-brand">{this.props.title}</span>
            <ul className="nav justify-content-end">
              {this.props.tabs &&
                this.props.tabs.map(oneTab => {
                  return (
                    <li key={oneTab.key} className="nav-item tab-item">
                      <ButtonTab
                        onClick={() => {
                          this.props.onNavTab(oneTab.key);
                        }}
                      >
                        {oneTab.icon && <TabIcon name={oneTab.icon} color="white" />}
                        {oneTab.icon === '' && oneTab.shortcut}
                      </ButtonTab>
                    </li>
                  );
                })}
              <li className="nav-item tab-item-action">
                <ButtonSubmit icon={true} label={false} onClick={this.props.onSubmit} />
              </li>
              <li className="nav-item tab-item-action">
                <ButtonCancel icon={true} label={false} onClick={this.props.onCancel} />
              </li>
            </ul>
          </div>
          <div className="card-body">{this.props.children}</div>
        </Mobile>
        <Desktop>
          <div className="card">
            <div className="card-header">
              <div className="float-right">
                <a classname="nav-link"><PreviousIcon /></a>
                <a classname="nav-link"><NextIcon /></a>
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
                              this.props.tab === oneTab.key && 'active',
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
            </div>
            <div className="card-body">{this.props.children}</div>
            <div className="card-footer text-right">
              <ButtonSubmit icon={false} label={true} onClick={this.props.onSubmit} />
              &nbsp;
              <ButtonCancel icon={false} label={true} onClick={this.props.onCancel} />
            </div>
          </div>
        </Desktop>
      </form>
    );
  }
}

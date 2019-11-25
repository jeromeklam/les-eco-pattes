import React, { Component } from 'react';
import { ButtonSubmit, ButtonCancel } from '../layout';
import { Desktop, Mobile } from "../common";

export default class FormResponsive extends Component {
  static propTypes = {};

  render() {
    return (
      <form>
        <div className="card">
          <div className="card-header">
            {this.props.title}
            <Mobile>
              <ButtonSubmit icon={true} label={false} onClick={this.props.onSubmit} />
              <ButtonCancel icon={true} label={false} onClick={this.props.onCancel} />
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

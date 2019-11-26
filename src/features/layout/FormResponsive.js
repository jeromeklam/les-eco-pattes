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
            <ul class="nav nav-tabs">
              <li>
                <a>{this.props.title}</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#D" onClick={() => {this.props.onNavTab('localisation')}}>Localisation</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#D"  onClick={() => {this.props.onNavTab('equipement')}}>Equipement</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#D" onClick={this.props.onNavTab}>Divers</a>
              </li>
              <Mobile>
                <li class="nav-item"> 
                  <ButtonSubmit icon={true} label={false} onClick={this.props.onSubmit} />
                </li>
                <li class="nav-item">
                  <ButtonCancel icon={true} label={false} onClick={this.props.onCancel} />
                </li>
              </Mobile>
            </ul>
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

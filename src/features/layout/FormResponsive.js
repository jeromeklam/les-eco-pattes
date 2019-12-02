import React, { Component } from 'react';
import { ButtonSubmit, ButtonCancel } from '../layout';
import { Desktop, Mobile } from "../common";
import TabIcon from '../icons/Tab';

export default class FormResponsive extends Component {
  static propTypes = {};

  render() {

    return (
      <form>
        <div className="card">
          <div className="card-header">         
            <Desktop>
              <div className="float-left">
                <span className="navbar-brand">{this.props.title}</span>  
              </div>            
              <ul className="nav justify-content-end">
                {this.props.tabs && this.props.tabs.map(oneTab => {
                  return (       
                    <li key={oneTab.key} className="nav-item">
                      <a className="nav-link" href="#" onClick={() => {this.props.onNavTab(oneTab.key)}}>{oneTab.label}</a>
                    </li>
                  )        
                })}
              </ul>
            </Desktop>            
            <Mobile>
              <div>
                <span className="navbar-brand">{this.props.title}</span>  
              </div>            
              <ul className="nav">              
                {this.props.tabs && this.props.tabs.map(oneTab => {
                  return (       
                    <li key={oneTab.key} className="nav-item">
                      <a className="nav-link" href="#" onClick={() => {this.props.onNavTab(oneTab.key)}}>
                        {oneTab.icon && 
                          <TabIcon name={oneTab.icon}/>
                        } 
                        {oneTab.icon == "" && 
                          oneTab.shortcut
                        }
                      </a>
                    </li>
                  )
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

import React, { Component } from 'react';
import classnames from 'classnames';
import { Desktop, Mobile } from '../common';
import TabIcon from '../icons/Tab';

export default class ButtonResponsive extends Component {
  static propTypes = {};

  render() {
    return (
      <button
        key={this.props.key}
        type="button"
        className={classnames("btn", "btn-" + this.props.button.theme)}
        onClick={this.props.button.function}
      >
        <Desktop>
          <span color="white">
            {this.props.button.name}
          </span>
        </Desktop>
        <Mobile>
          <TabIcon name={this.props.button.icon} color="white" />
        </Mobile>
      </button>
    );
  }
}

import React, { Component } from 'react';

export default class SiteMarker extends Component {
  static propTypes = {};

  eventParameters = event => ({
    event,
    anchor: this.props.anchor,
    payload: this.props.payload,
  });

  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleContextMenu = this.handleContextMenu.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  handleClick = event => {
    this.props.onClick && this.props.onClick(this.eventParameters(event));
  };

  handleContextMenu = event => {
    this.props.onContextMenu && this.props.onContextMenu(this.eventParameters(event));
  };

  handleMouseOver = event => {
    this.props.onMouseOver && this.props.onMouseOver(this.eventParameters(event));
    this.setState({ hover: true });
  };

  handleMouseOut = event => {
    this.props.onMouseOut && this.props.onMouseOut(this.eventParameters(event));
    this.setState({ hover: false });
  };

  render() {
    const { left, top, style, children } = this.props;
    return (
      <div>
        <div
          className="pin1"
          style={{
            position: 'absolute',
            left: left - 15,
            top: top - 30,
            width: 30,
            height: 30,
            ...(style || {}),
          }}
          onClick={this.handleClick}
          onContextMenu={this.handleContextMenu}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
        >
          >{children}
        </div>
        {this.props.title && this.state.hover && (
          <div
            className="marker-title bg-secondary-light p-2"
            style={{
              position: 'absolute',
              left: left - 5,
              top: top + 10,
              ...(style || {}),
            }}
          >
            <span>{this.props.title}</span>
          </div>
        )}
      </div>
    );
  }
}

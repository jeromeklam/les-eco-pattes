import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { ButtonResponsive } from '../layout';

export default class ResponsiveModal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node,
    buttons: PropTypes.array,
    size: PropTypes.string.isRequired,
  };

  render() {
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="backdrop-style">
        <div className="modal-style">
          <div className="modal fade show">
            <div className={classnames("modal-dialog", "modal-" + this.props.size)}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    {this.props.title}
                  </h5>
                  <button type="button" className="close" onClick={this.props.onClose}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">{this.props.children}</div>
                {this.props.buttons &&
                  <div className="modal-footer">
                    {this.props.buttons.map(button => {
                      return (
                        <ButtonResponsive 
                          key={button.name}
                          button={button}
                        />
                      );
                    })}
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

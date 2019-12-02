import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export default class ModalResponsive extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node,
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
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    {this.props.title}
                  </h5>
                  <button type="button" className="close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">{this.props.children}</div>
                <div className="modal-footer">
                  {this.props.buttons.map(button => {
                    return (
                      <button
                        key={button.name}
                        type="button"
                        className={classnames("btn", "btn-" + button.theme)}
                        onClick={button.function}
                      >
                        {button.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

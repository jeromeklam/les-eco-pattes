import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ModalResponsive } from './';

export default class ConfirmResponsive extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    show: PropTypes.bool,
  };

  render() {
    const buttons = [
      {name: "Oui", function: this.props.onConfirm, theme: "success"},
      {name: "Non", function: this.props.onClose, theme: "warning"},
    ];
    return (
      <ModalResponsive show={this.props.show} onClose={this.props.onClose} title="Confirmation" buttons={buttons}>
        <p>Confirmez-vous la suppression ?</p>
      </ModalResponsive>
    );
  }
}

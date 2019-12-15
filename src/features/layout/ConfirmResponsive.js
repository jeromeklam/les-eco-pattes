import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ResponsiveModal } from '../common';

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
      <ResponsiveModal 
        title="Confirmation"
        size="md"
        show={this.props.show} 
        onClose={this.props.onClose}  
        buttons={buttons}
      >
        <p>Confirmez-vous la suppression ?</p>
      </ResponsiveModal>
    );
  }
}

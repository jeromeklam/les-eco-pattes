import React, { Component } from 'react';
import { ResponsiveForm, ResponsiveModal } from 'react-bootstrap-front';

export default class ResponsiveModalOrForm extends Component {
  static propTypes = {};

  render() {
    if (this.props.modal) {
      const buttons = [
        { name: 'Enregistrer', function: this.props.onSubmit, theme: 'primary', icon: 'valid' },
        { name: 'Annuler', function: this.props.onClose, theme: 'secondary', icon: 'close' },
      ];
      return (
        <ResponsiveModal
          {...this.props}
          size={this.props.size || 'fullscreen'}
          show={true}
          buttons={buttons}
        />
      );
    }
    return <ResponsiveForm {...this.props} />;
  }
}

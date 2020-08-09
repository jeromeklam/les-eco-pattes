import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ResponsiveModal } from 'freeassofront'

export default class CommentModal extends Component {
  static propTypes = {
    title: PropTypes.string,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  static defaultProps = {
    title: '',
  };

  render() {
    const buttons = [
      { name: 'Enregistrer', function: this.props.onSubmit, theme: 'primary', icon: 'valid' },
      { name: 'Annuler', function: this.props.onClose, theme: 'secondary', icon: 'close' },
    ];
    if (this.props.show) {
      return (
        <ResponsiveModal
          size="sm"
          title={this.props.title}
          show={true}
          onClose={this.props.onClose}
          buttons={buttons}
          modalClassName="bg-primary-light text-secondary"
          closeClassName="text-secondary"
        >
          <textarea className="full-input">
            {this.props.comment}
          </textarea>
        </ResponsiveModal>
      );
    }
    return null;
  }
}

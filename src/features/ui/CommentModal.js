import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ResponsiveModal } from 'react-bootstrap-front'

export default class CommentModal extends Component {
  static propTypes = {
    title: PropTypes.string,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  static defaultProps = {
    title: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      comment: props.comment,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ comment: event.target.value });
  }

  onSubmit() {
    this.props.onSubmit(this.state.comment);
  }

  render() {
    const buttons = [
      { name: 'Enregistrer', function: this.onSubmit, theme: 'primary', icon: 'valid' },
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
          <textarea 
            className="full-input" 
            value={this.state.comment}
            onChange={this.onChange}
          />
        </ResponsiveModal>
      );
    }
    return null;
  }
}

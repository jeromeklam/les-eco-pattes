import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ResponsiveModal } from 'freeassofront'

export default class ImageModal extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    image: PropTypes.element.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  render() {
    if (this.props.show) {
      return (
        <ResponsiveModal
          size="lg"
          title={this.props.title}
          show={true}
          onClose={this.props.onClose}
          buttons={[]}
        >
          <div className="container-fluid text-center">
            <img src={this.props.image} class="img-fluid" alt="Responsive image" />
          </div>
        </ResponsiveModal>
      );
    }
    return null;
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ResponsiveModal } from 'react-bootstrap-front'

export default class ImageModal extends Component {
  static propTypes = {
    title: PropTypes.string,
    show: PropTypes.bool.isRequired,
    image: PropTypes.oneOfType([PropTypes.element,PropTypes.string]),
    onClose: PropTypes.func.isRequired,
  };

  static defaultProps = {
    title: '',
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
          modalClassName="bg-primary-light text-secondary"
          closeClassName="text-secondary"
        >
          <div className="container-fluid text-center">
            <img src={this.props.image} className="img-fluid" alt="Responsive" />
          </div>
        </ResponsiveModal>
      );
    }
    return null;
  }
}

import React from 'react';
import PropTypes from 'prop-types';
import { Loading3Dots } from 'react-bootstrap-front';

export default function CenteredLoading3Dots(props) {
  if (props.show) {
    return (
      <div className="mt-2 text-center">
        <div className="ui-centered-loading-3-dots-loader text-primary">
          <Loading3Dots />
        </div>
      </div>
    );
  }
  return null;
}

CenteredLoading3Dots.propTypes = {
  show: PropTypes.bool,
};
CenteredLoading3Dots.defaultProps = {
  show: true,
};

import React from 'react';
import { Loading9x9, Portal } from 'react-bootstrap-front';
// import PropTypes from 'prop-types';

export default function PortalLoader() {
  return (
    <Portal className="ui-portal-loader-portal">
      <div className="ui-portal-loader-inner">
        <div className="spinner">
          <div className="spinner-circle spinner-circle-outer"></div>
          <div className="spinner-circle-off spinner-circle-inner"></div>
          <div className="spinner-circle spinner-circle-single-1"></div>
          <div className="spinner-circle spinner-circle-single-2"></div>
          <div className="text">...chargement...</div>
        </div>
      </div>
    </Portal>
  );
}

PortalLoader.propTypes = {};
PortalLoader.defaultProps = {};

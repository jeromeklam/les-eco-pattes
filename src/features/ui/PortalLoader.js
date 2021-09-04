import React from 'react';
import { Loading9x9, Portal } from 'react-bootstrap-front';
// import PropTypes from 'prop-types';

export default function PortalLoader() {
  return (
    <Portal className="ui-portal-loader-portal">
      <div className="ui-portal-loader-inner">
        <div className="ui-portal-loader-loader text-primary">
          <Loading9x9/>
        </div>
      </div>
    </Portal>
  );
};

PortalLoader.propTypes = {};
PortalLoader.defaultProps = {};

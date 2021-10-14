import React from 'react';
// import PropTypes from 'prop-types';
import { mdiFax as myIcon } from '@mdi/js';
import { Icon } from './';

export default function Fax(props) {
  return <Icon path={myIcon} {...props} />;
}

Fax.propTypes = {};
Fax.defaultProps = {};

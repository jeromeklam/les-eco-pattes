import React from 'react';
import { mdiShield as myIcon } from '@mdi/js';
import { Icon } from './';

export default function Security(props) {
  return <Icon path={myIcon} {...props} />;
};

Security.propTypes = {};
Security.defaultProps = {};
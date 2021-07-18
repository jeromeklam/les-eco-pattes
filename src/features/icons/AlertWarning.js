import React from 'react';
// import PropTypes from 'prop-types';
import { mdiClipboardAlertOutline as myIcon } from '@mdi/js';
//import { mdiClipboardClockOutline as myIcon } from '@mdi/js';
import { Icon } from './';

export default function AlertWarning(props) {
  return <Icon path={myIcon} {...props} />;
};

AlertWarning.propTypes = {};
AlertWarning.defaultProps = {};

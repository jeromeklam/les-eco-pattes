import React from 'react';
// import PropTypes from 'prop-types';
import { mdiClipboardAlertOutline as myIcon } from '@mdi/js';
import { Icon } from './';

export default function AlertDanger(props) {
  return <Icon path={myIcon} {...props} />;
};

AlertDanger.propTypes = {};
AlertDanger.defaultProps = {};

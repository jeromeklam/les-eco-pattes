import React from 'react';
import { mdiClockAlertOutline as myIcon } from '@mdi/js';
import { Icon } from './';

export default function Expired(props) {
  return <Icon path={myIcon} {...props} />;
};

Expired.propTypes = {};
Expired.defaultProps = {};
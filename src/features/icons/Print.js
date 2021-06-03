import React from 'react';
import { mdiCloudPrintOutline as myIcon } from '@mdi/js';
import { Icon } from './';

export default function Print(props) {
  return <Icon path={myIcon} {...props} />;
}

Print.propTypes = {};
Print.defaultProps = {};
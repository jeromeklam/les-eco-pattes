import React from 'react';
import { mdiCheckBold as myIcon } from '@mdi/js';
import { Icon } from './';

export default function Valid(props) {
  return <Icon path={myIcon} {...props} />
};

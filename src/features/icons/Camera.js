import React from 'react';
import { mdiCamera as myIcon } from '@mdi/js';
import { Icon } from './';

export default function Camera(props) {
  return (
    <Icon path={myIcon} {...props} />
  );
};
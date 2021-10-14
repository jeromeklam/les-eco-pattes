import React from 'react';
import { mdiPhone as myIcon } from '@mdi/js';
import { Icon } from './';

export default function Phone(props) {
  return <Icon path={myIcon} {...props} />;
};

Phone.propTypes = {};
Phone.defaultProps = {};
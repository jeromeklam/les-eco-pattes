import React from 'react';
import { mdiAccount as myIcon } from '@mdi/js';
import { Icon } from './';

export default function User(props) {
  return <Icon path={myIcon} {...props} />;
};

User.propTypes = {};
User.defaultProps = {};
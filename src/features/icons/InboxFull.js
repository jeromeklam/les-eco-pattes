import React from 'react';
import { Icon } from './';
import { mdiTrayFull as myIcon } from '@mdi/js';

export default function InboxFull(props) {
  return (
    <Icon path={myIcon} {...props} />
  );
};

InboxFull.propTypes = {};
InboxFull.defaultProps = {};

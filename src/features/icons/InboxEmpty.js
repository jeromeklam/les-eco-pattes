import React from 'react';
import { Icon } from './';
import { mdiTray as myIcon } from '@mdi/js';

export default function InboxEmpty(props) {
  return (
    <Icon path={myIcon} {...props} />
  );
};

InboxEmpty.propTypes = {};
InboxEmpty.defaultProps = {};
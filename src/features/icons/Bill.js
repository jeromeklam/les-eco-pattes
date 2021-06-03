import React from 'react';
// import PropTypes from 'prop-types';
import { mdiFileTableOutline as myIcon } from '@mdi/js';
import { Icon } from './';

export default function Bill(props) {
  return <Icon path={myIcon} {...props} />;
};

Bill.propTypes = {};
Bill.defaultProps = {};
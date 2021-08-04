import React from 'react';
// import PropTypes from 'prop-types';
import { mdiMenuDown as myIcon } from '@mdi/js';
import { Icon } from './';

export default function MenuDropDown(props) {
  return <Icon path={myIcon} {...props} />;
};

MenuDropDown.propTypes = {};
MenuDropDown.defaultProps = {};

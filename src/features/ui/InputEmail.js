import React from 'react';
// import PropTypes from 'prop-types';
import { InputEmail as UIInputEmail } from 'react-bootstrap-front';
import { Email as EmailIcon } from '../icons';

export default function InputEmail(props) {
  return <UIInputEmail {...props} eMailIcon={<EmailIcon />} />;
}

InputEmail.propTypes = {};
InputEmail.defaultProps = {};

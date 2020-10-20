import React from 'react';
import PropTypes from 'prop-types';
import { InputPassword as RBFInputPassword } from 'react-bootstrap-front';
import { 
  Security as SecurityIcon,
  Zoom as EyeIcon 
} from '../icons';

export default function InputPassword(props) {
  return (
    <RBFInputPassword
      {...props}    
      securityIcon={props.security ? <SecurityIcon size={0.9} /> : null}
      viewIcon={props.control ? <EyeIcon className="text-secondary" size={0.9} /> : null}
    />
  );
};

InputPassword.propTypes = {
  control: PropTypes.bool,
  security: PropTypes.bool,
};

InputPassword.defaultProps = {
  control: true,
  security: true,
};

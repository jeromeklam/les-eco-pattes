import React from 'react';
import { InputPhone as UIInputPhone } from 'react-bootstrap-front';
import { Phone as PhoneIcon, Fax as FaxIcon } from '../icons';

export default function InputPhone(props) {
  return (
    <UIInputPhone
      {...props}
      phoneIcon={<PhoneIcon className="text-secondary" size={0.8} />}
      faxIcon={<FaxIcon className="text-secondary" size={0.8} />}
    />
  );
}

import React from 'react';
import { injectIntl } from 'react-intl';
import { InputHidden, InputText } from 'react-bootstrap-front';
import { useForm, ResponsiveModalOrForm } from '../ui';

function Form(props) {
  const { values, handleChange, handleSubmit, handleCancel, getErrorMessage } = useForm(
    props.item,
    '',
    props.onSubmit,
    props.onCancel,
    '',
    props.errors,
    props.intl
  );
  return (
    <ResponsiveModalOrForm 
      className="m-5"
      size="xs"
      modal={true} 
      title="Type de contact" 
      onSubmit={handleSubmit} 
      onCancel={handleCancel}
      onClose={props.onClose}
    >
      <InputHidden name="id" id="id" value={values.id} />
      <InputText
        label="Nom"
        name="clit_name"
        id="clit_name"
        required={true}
        value={values.clit_name}
        onChange={handleChange}
        error={getErrorMessage('clit_name')}
      />
    </ResponsiveModalOrForm>
  );
};

export default injectIntl(Form);
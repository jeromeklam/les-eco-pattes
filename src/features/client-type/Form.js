import React from 'react';
import { InputHidden, InputText } from 'react-bootstrap-front';
import { useForm, ResponsiveModalOrForm } from '../ui';

export default function Form(props) {
  const { values, handleChange, handleSubmit, handleCancel, getErrorMessage } = useForm(
    props.item,
    '',
    props.onSubmit,
    props.onCancel,
    '',
    props.errors,
  );
  return (
    <ResponsiveModalOrForm 
      className="m-5"
      size="md"
      modal={true} 
      title="Type de client" 
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
}

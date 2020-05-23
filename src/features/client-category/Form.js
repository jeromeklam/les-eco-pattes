import React from 'react';
import { InputHidden, InputText } from 'freeassofront';
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
      title="Catégorie de personne" 
      onSubmit={handleSubmit} 
      onCancel={handleCancel}
      onClose={props.onClose}
    >
      <InputHidden name="id" id="id" value={values.id} />
      <InputText
        label="Nom"
        name="clic_name"
        id="clic_name"
        required={true}
        value={values.clic_name}
        onChange={handleChange}
        error={getErrorMessage('clic_name')}
      />
    </ResponsiveModalOrForm>
  );
}

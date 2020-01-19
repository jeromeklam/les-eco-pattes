import React from 'react';
import { InputHidden, InputText, ResponsiveForm } from 'freeassofront';
import useForm from '../ui/useForm';

export default function Form(props) {
  const { values, handleChange, handleSubmit, handleCancel, getErrorMessage } = useForm(
    props.item,
    '',
    props.onSubmit,
    props.onCancel,
    props.errors,
  );
  return (
    <ResponsiveForm 
      title="Catégorie de client" 
      onSubmit={handleSubmit} 
      onCancel={handleCancel}
    >
      <div className="card-body">
        <InputHidden name="id" id="id" value={values.id} />
        <InputText
          label="Nom"
          name="clic_name"
          id="clic_name"
          value={values.clic_name}
          onChange={handleChange}
          error={getErrorMessage("clic_name")}
        />
      </div>
    </ResponsiveForm>
  );
}

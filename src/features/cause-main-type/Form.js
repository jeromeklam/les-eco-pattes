import React from 'react';
import { InputHidden, InputText, ResponsiveForm } from 'freeassofront';
import useForm from '../ui/useForm';

export default function Form(props) {
  const { values, handleChange, handleSubmit, handleCancel, getErrorMessage } = useForm(
    props.item,
    '',
    props.onSubmit,
    props.onCancel,
    null,
    props.errors,
  );
  return (
    <ResponsiveForm 
      className=""
      title="Espèce" 
      onSubmit={handleSubmit} 
      onCancel={handleCancel}
    >
      <div className="card-body">
        <InputHidden name="id" id="id" value={values.id} />
        <InputText
          label="Nom"
          name="camt_name"
          required={true}
          value={values.camt_name}
          onChange={handleChange}
          error={getErrorMessage("camt_name")}
        />
      </div>
    </ResponsiveForm>
  );
}

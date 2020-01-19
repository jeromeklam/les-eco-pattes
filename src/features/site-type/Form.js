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
      title="Types de site" 
      onSubmit={handleSubmit} 
      onCancel={handleCancel}
    >
      <div className="card-body">
        <InputHidden name="id" id="id" value={values.id} />
        <InputText
          label="Nom"
          name="sitt_name"
          id="sitt_name"
          value={values.sitt_name}
          onChange={handleChange}
          error={getErrorMessage("sitt_name")}
        />
      </div>
    </ResponsiveForm>
  );
}

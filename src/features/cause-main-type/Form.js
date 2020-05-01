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
      title="Grande Cause" 
      onSubmit={handleSubmit} 
      onCancel={handleCancel}
      onClose={props.onClose}
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
    </ResponsiveModalOrForm>
  );
}

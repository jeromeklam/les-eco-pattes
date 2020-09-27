import React from 'react';
import { InputHidden, InputText } from 'react-bootstrap-front';
import { ResponsiveModalOrForm, useForm } from '../ui';

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
    <ResponsiveModalOrForm 
      title="Famille" 
      onSubmit={handleSubmit} 
      onCancel={handleCancel}
      onClose={props.onClose}
      modal
    >
      <div className="card-body">
        <InputHidden name="id" id="id" value={values.id} />
        <InputText
          label="Nom"
          name="fam_name"
          id="fam_name"
          value={values.fam_name}
          onChange={handleChange}
          error={getErrorMessage("fam_name")}
        />
      </div>
    </ResponsiveModalOrForm>
  );
}

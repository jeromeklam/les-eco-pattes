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
        <div className="row">
          <div className="col-12">
            <InputText
              label="Nom"
              name="sitt_name"
              id="sitt_name"
              value={values.sitt_name}
              onChange={handleChange}
              error={getErrorMessage("sitt_name")}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-36">
            <InputText
              label="Expression de saisie du n° d'élevage EDE"
              name="sitt_pattern"
              id="sitt_pattern"
              value={values.sitt_pattern}
              onChange={handleChange}
              error={getErrorMessage("sitt_pattern")}
            />
          </div>
        </div>
      </div>
    </ResponsiveForm>
  );
}

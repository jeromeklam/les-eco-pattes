import React from 'react';
import { InputHidden, InputText, InputSelect, ResponsiveForm } from 'freeassofront';
import useForm from '../ui/useForm';
import { causeMainTypeAsOptions } from '../cause-main-type/functions.js';

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
      className=""
      title="Race" 
      onSubmit={handleSubmit} 
      onCancel={handleCancel}
    >
      <div className="card-body">
        <InputHidden name="id" id="id" value={values.id} />
        <InputText
          label="Nom"
          name="caut_name"
          id="caut_name"
          value={values.caut_name}
          onChange={handleChange}
          error={getErrorMessage("caut_name")}
        />
        <InputSelect
          label="Espèce"
          name="cause_main_type.id"
          id="cause_main_type.id"
          value={values.cause_main_type.id}
          onChange={handleChange}
          options={causeMainTypeAsOptions(props.cause_main_type)}
          error={getErrorMessage("cause_main_type")}
        />
      </div>
    </ResponsiveForm>
  );
}

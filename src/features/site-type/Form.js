import React, { Component } from 'react';
import { InputHidden, InputText, FormResponsive } from '../layout';
import useForm from '../layout/useForm';

export default function Form(props) {
  const { values, handleChange, handleSubmit, handleCancel } = useForm(
    props.item,
    '',
    props.onSubmit,
    props.onCancel,
  );
  return (
    <FormResponsive title="Types de site" onSubmit={handleSubmit} onCancel={handleCancel}>
      <div className="card-body">
        <InputHidden name="id" id="id" value={values.id} />
        <InputText
          label="Nom"
          name="sitt_name"
          id="sitt_name"
          value={values.sitt_name}
          onChange={handleChange}
        />
      </div>
    </FormResponsive>
  );
}

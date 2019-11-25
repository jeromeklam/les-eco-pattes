import React, { Component } from 'react';
import { InputHidden, InputText, FormResponsive } from '../layout';
import useForm from '../layout/useForm';

export default function Form(props) {
  const { values, handleChange, handleSubmit, handleCancel } = useForm(
    props.item,
    props.onSubmit,
    props.onCancel,
  );
  return (
    <FormResponsive title="Types d'animaux" onSubmit={handleSubmit} onCancel={handleCancel}>
      <div className="card-body">
        <InputHidden name="id" id="id" value={values.id} />
        <InputText
          label="Nom"
          name="caut_name"
          id="caut_name"
          value={values.caut_name}
          onChange={handleChange}
        />
      </div>
    </FormResponsive>
  );
}

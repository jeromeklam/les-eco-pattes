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
    <FormResponsive title="Animaux" onSubmit={handleSubmit} onCancel={handleCancel}>
      <InputHidden name="id" id="id" value={values.id} />
      <InputText
        label="Nom"
        name="cau_name"
        id="cau_name"
        value={values.cau_name}
        onChange={handleChange}
      />
    </FormResponsive>
  );
}

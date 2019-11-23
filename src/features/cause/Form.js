import React, { Component } from 'react';
import { InputHidden, InputText, ButtonSubmit, ButtonCancel } from '../layout';
import useForm from '../layout/useForm';

export default function Form(props) {
  const { values, handleChange, handleSubmit, handleCancel } = useForm(props.item, props.onSubmit, props.onCancel);
  return (
    <div className="card">
      <form>
        <div className="card-header">Animaux</div>
        <div className="card-body">
          <InputHidden name="id" id="id" value={values.id} />
          <InputText
            label="Nom"
            name="cau_name"
            id="cau_name"
            value={values.cau_name}
            onChange={handleChange}
          />
        </div>
        <div className="card-footer text-right">
          <ButtonSubmit onClick={handleSubmit} />
          &nbsp;
          <ButtonCancel onClick={handleCancel} />
        </div>
      </form>
    </div>
  );
}

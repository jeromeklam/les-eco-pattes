import React, { Component } from 'react';
import { InputHidden, InputText, ButtonSubmit, ButtonCancel } from '../layout';
import useForm from '../layout/useForm';

export default function Form(props) {
  const { values, handleChange, handleSubmit, handleCancel } = useForm(props.item, props.onSubmit, props.onCancel);
  return (
    <div className="card">
      <form>
        <div className="card-header">Type d'animaux</div>
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
        <div className="card-footer text-right">
          <ButtonSubmit onClick={handleSubmit} />
          &nbsp;
          <ButtonCancel onClick={handleCancel} />
        </div>
      </form>
    </div>
  );
}

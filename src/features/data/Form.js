import React, { Component } from 'react';
import { InputHidden, InputText, InputSelect, ButtonSubmit, ButtonCancel } from '../layout';
import { dataTypes } from './functions';
import useForm from '../layout/useForm';

/**
 * Functionnal Component
 */
export default function Form(props) {
  const { values, handleChange, handleSubmit, handleCancel } = useForm(props.item, props.onSubmit, props.onCancel);
  const optionsType = dataTypes();
  return (
    <div className="card">
      <form>
        <div className="card-header">Données</div>
        <div className="card-body">
          <InputHidden name="id" id="id" value={values.id} />
          <InputText
            label="Nom"
            name="data_name"
            required={true}
            value={values.data_name}
            onChange={handleChange}
          />
          <InputSelect
            label="Type"
            name="data_type"
            value={values.data_type}
            required={true}
            addempty={true}
            onChange={handleChange}
            options={optionsType}
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

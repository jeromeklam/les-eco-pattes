import React from 'react';
import { InputHidden, InputText, InputSelect } from 'freeassofront';
import { dataTypes } from './functions';
import { useForm, InputStringarray, ResponsiveModalOrForm } from '../ui';

/**
 * Functionnal Component
 */
export default function Form(props) {
  const { values, handleChange, handleSubmit, handleCancel } = useForm(
    props.item,
    '',
    props.onSubmit,
    props.onCancel,
  );
  const optionsType = dataTypes();
  return (
    <ResponsiveModalOrForm
      size="md"
      modal={true}
      className="m-5"
      title="Variable"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onClose={props.onClose}
    >
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
      {values.data_type === 'LIST' && (
        <InputStringarray
          label="Valeurs"
          name="data_content"
          value={values.data_content}
          onChange={handleChange}
          options={optionsType}
        />
      )}
    </ResponsiveModalOrForm>
  );
}

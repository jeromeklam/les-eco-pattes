import React from 'react';
import { InputHidden, InputText, InputSelect } from 'react-bootstrap-front';
import { dataTypes } from './functions';
import { useForm, InputStringarray, ResponsiveModalOrForm } from '../ui';

/**
 * Functionnal Component
 */
export default function Form(props) {
  const { values, handleChange, handleSubmit, handleCancel, getErrorMessage } = useForm(
    props.item,
    '',
    props.onSubmit,
    props.onCancel,
    null,
    props.errors
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
        error={getErrorMessage('data_name')}
      />
      <InputSelect
        label="Type"
        name="data_type"
        value={values.data_type}
        required={true}
        addempty={true}
        onChange={handleChange}
        disabled={props.modify || false}
        options={optionsType}
        error={getErrorMessage('data_type')}
      />
      {values.data_type === 'LIST' && (
        <InputStringarray
          label="Valeurs"
          titleValue="Code"
          titleLabel="Libellé"
          name="data_content"
          value={values.data_content}
          onChange={handleChange}
          options={optionsType}
        />
      )}
    </ResponsiveModalOrForm>
  );
}

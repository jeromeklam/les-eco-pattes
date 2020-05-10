import React from 'react';
import { InputHidden, InputText } from 'freeassofront';
import { useForm, ResponsiveModalOrForm } from '../ui';

export default function Form(props) {
  const { values, handleChange, handleSubmit, handleCancel, getErrorMessage } = useForm(
    props.item,
    '',
    props.onSubmit,
    props.onCancel,
    '',
    props.errors,
  );
  return (
    <ResponsiveModalOrForm
      className="m-5"
      size="md"
      modal={true}
      title="Type de site"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onClose={props.onClose}
    >
      <InputHidden name="id" id="id" value={values.id} />
      <div className="row">
        <div className="col-sm-36">
          <InputText
            label="Nom"
            name="sitt_name"
            id="sitt_name"
            required={true}
            value={values.sitt_name}
            onChange={handleChange}
            error={getErrorMessage('sitt_name')}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-36">
          <InputText
            label="Format de saisie N° EDE"
            name="sitt_pattern"
            id="sitt_pattern"
            value={values.sitt_pattern}
            onChange={handleChange}
            error={getErrorMessage('sitt_pattern')}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-36">
          <InputText
            label="Masque de saisie"
            name="sitt_mask"
            id="sitt_mask"
            value={values.sitt_mask}
            onChange={handleChange}
            error={getErrorMessage('sitt_mask')}
          />
        </div>
      </div>
    </ResponsiveModalOrForm>
  );
}

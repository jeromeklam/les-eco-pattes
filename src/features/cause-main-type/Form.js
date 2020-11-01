import React from 'react';
import { injectIntl } from 'react-intl';
import { InputHidden, InputText } from 'react-bootstrap-front';
import { useForm, ResponsiveModalOrForm } from '../ui';

function Form(props) {
  const { values, handleChange, handleSubmit, handleCancel, getErrorMessage } = useForm(
    props.item,
    '',
    props.onSubmit,
    props.onCancel,
    '',
    props.errors,
    props.intl
  );
  return (
    <ResponsiveModalOrForm 
      className="m-5" 
      size="xs"
      modal={true} 
      title="Espèces" 
      onSubmit={handleSubmit} 
      onCancel={handleCancel}
      onClose={props.onClose}
    >
      <div className="card-body">
        <InputHidden name="id" id="id" value={values.id} />
        <InputText
          label="Nom"
          name="camt_name"
          required={true}
          value={values.camt_name}
          onChange={handleChange}
          error={getErrorMessage("camt_name")}
        />
      </div>
    </ResponsiveModalOrForm>
  );
};

export default injectIntl(Form);
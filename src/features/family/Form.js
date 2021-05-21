import React from 'react';
import { injectIntl } from 'react-intl';
import { InputHidden, InputText } from 'react-bootstrap-front';
import { ResponsiveModalOrForm, useForm } from '../ui';

function Form(props) {
  const { values, handleChange, handleSubmit, handleCancel, getErrorMessage } = useForm(
    props.item,
    '',
    props.onSubmit,
    props.onCancel,
    null,
    props.errors,
    props.intl,
  );
  return (
    <ResponsiveModalOrForm
      title="Famille"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onClose={props.onClose}
      modal
      size="md"
    >
      <div className="card-body">
        <InputHidden name="id" id="id" value={values.id} />
        <InputText
          label="Nom"
          name="fam_name"
          id="fam_name"
          value={values.fam_name}
          onChange={handleChange}
          error={getErrorMessage('fam_name')}
        />
      </div>
    </ResponsiveModalOrForm>
  );
}

export default injectIntl(Form);

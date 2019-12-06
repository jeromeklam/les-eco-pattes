import React from 'react';
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
    <FormResponsive title="Type de client" onSubmit={handleSubmit} onCancel={handleCancel}>
      <div className="card-body">
        <InputHidden name="id" id="id" value={values.id} />
        <InputText
          label="Nom"
          name="clit_name"
          id="clit_name"
          value={values.clit_name}
          onChange={handleChange}
        />
      </div>
    </FormResponsive>
  );
}

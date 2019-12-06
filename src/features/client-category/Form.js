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
    <FormResponsive title="Catégorie de client" onSubmit={handleSubmit} onCancel={handleCancel}>
      <div className="card-body">
        <InputHidden name="id" id="id" value={values.id} />
        <InputText
          label="Nom"
          name="clic_name"
          id="clic_name"
          value={values.clic_name}
          onChange={handleChange}
        />
      </div>
    </FormResponsive>
  );
}

import React from 'react';
import { InputHidden, InputText, InputSelect, FormResponsive } from '../layout';
import useForm from '../layout/useForm';

export default function Form(props) {
  const { values, handleChange, handleSubmit, handleCancel } = useForm(
    props.item,
    '',
    props.onSubmit,
    props.onCancel,
  );
  return (
    <FormResponsive title="Race" onSubmit={handleSubmit} onCancel={handleCancel}>
      <div className="card-body">
        <InputHidden name="id" id="id" value={values.id} />
        <InputText
          label="Nom"
          name="caut_name"
          id="caut_name"
          value={values.caut_name}
          onChange={handleChange}
        />
        <InputSelect
          label="Espèce"
          name="cause_main_type.id"
          id="cause_main_type.id"
          value={values.cause_main_type.id}
          onChange={handleChange}
          options={props.causeMainType}
        />
      </div>
    </FormResponsive>
  );
}

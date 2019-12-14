import React from 'react';
import { 
  InputHidden, 
  InputText, 
  InputSelect, 
  FormResponsive 
} from '../layout';
import useForm from '../layout/useForm';

export default function Form(props) {
  const { values, handleChange, handleSubmit, handleCancel } = useForm(
    props.item,
    '',
    props.onSubmit,
    props.onCancel,
  );
  return (
    <FormResponsive title="Personne" onSubmit={handleSubmit} onCancel={handleCancel}>
      <div className="card-body">
        <InputHidden name="id" id="id" value={values.id} />
        <InputText
          label="Nom"
          name="cli_lastname"
          id="cli_lastname"
          required={true}
          value={values.cli_lastname}
          onChange={handleChange}
        />
      </div>
    </FormResponsive>
  );
}
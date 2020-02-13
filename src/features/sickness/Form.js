import React from 'react';
import {
  InputHidden,
  InputText,
  InputTextarea,
  InputSelect,
  InputCheckbox,
  ResponsiveForm,
} from 'freeassofront';
import useForm from '../ui/useForm';
import { sicknessTypeSelect } from './';

export default function Form(props) {
  const { values, handleChange, handleSubmit, handleCancel, getErrorMessage } = useForm(
    props.item,
    '',
    props.onSubmit,
    props.onCancel,
    null,
    props.errors,
  );
  return (
    <ResponsiveForm className="" title="Maladies" onSubmit={handleSubmit} onCancel={handleCancel}>
      <div className="card-body">
        <InputHidden name="id" id="id" value={values.id} />
        <div className="row">
          <div className="col-12">
            <InputText
              label="Nom"
              name="sick_name"
              id="sick_name"
              required={true}
              value={values.sick_name}
              onChange={handleChange}
              error={getErrorMessage('sick_name')}
            />
          </div>
          <div className="col-sm-12">
            <InputSelect
              label="Type"
              id="sick_type"
              name="sick_type"
              required={true}
              value={values.sick_type ? values.sick_type : ''}
              onChange={handleChange}
              options={sicknessTypeSelect}
              addempty={true}
              error={getErrorMessage('sick_type')}
            />
          </div>
          <div className="col-sm-4">
            <InputCheckbox
              label="Contagieux"
              name="sick_spead"
              labelTop={true}
              checked={values.sick_spead === true}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <InputText
              label="Dure moyenne (j)"
              name="sick_duration"
              id="sick_duration"
              value={values.sick_duration}
              onChange={handleChange}
              error={getErrorMessage('sick_duration')}
            />
          </div>
          <div className="col-12">
            <InputText
              label="Fréquence de contrôle (j)"
              name="sick_freq"
              id="sick_freq"
              value={values.sick_freq}
              onChange={handleChange}
              error={getErrorMessage('sick_freq')}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-36">
            <InputTextarea
              label="Description"
              name="sick_desc"
              id="sick_desc"
              value={values.sick_desc}
              onChange={handleChange}
              error={getErrorMessage('sick_desc')}
            />
          </div>
        </div>
      </div>
    </ResponsiveForm>
  );
}

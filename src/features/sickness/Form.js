import React from 'react';
import { injectIntl } from 'react-intl';
import { InputHidden, InputText, InputSelect, InputCheckbox } from 'react-bootstrap-front';
import { ResponsiveModalOrForm, InputTextarea, useForm } from '../ui';
import { sicknessTypeSelect } from './';

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
      className=""
      title="Maladie"
      size="lg"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onClose={props.onClose}
      modal={props.modal || false}
    >
      <div className="card-body">
        <InputHidden name="id" id="id" value={values.id} />
        <div className="row">
          <div className="col-xs-w12">
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
          <div className="col-sm-w12">
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
          <div className="col-sm-w4">
            <InputCheckbox
              label="Contagieux"
              name="sick_spread"
              labelTop={true}
              checked={values.sick_spread === true}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-w12">
            <InputText
              label="Durée moyenne (j)"
              name="sick_duration"
              id="sick_duration"
              value={values.sick_duration}
              onChange={handleChange}
              error={getErrorMessage('sick_duration')}
            />
          </div>
          <div className="col-xs-w12">
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
          <div className="col-xs-w36">
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
    </ResponsiveModalOrForm>
  );
}

export default injectIntl(Form);

import React from 'react';
import { InputHidden, InputText, InputSelect, ResponsiveForm } from 'freeassofront';
import useForm from '../ui/useForm';
import { clientTypeAsOptions } from '../client-type/functions.js';
import { clientCategoryAsOptions } from '../client-category/functions.js';

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
    <ResponsiveForm title="Personne" onSubmit={handleSubmit} onCancel={handleCancel}>
      <div className="card-body">
        <InputHidden name="id" id="id" value={values.id} />
        <div className="row">
          <div className="col-sm-18">
            <InputText
              label="Nom"
              name="cli_lastname"
              id="cli_lastname"
              required={true}
              value={values.cli_lastname}
              onChange={handleChange}
              error={getErrorMessage('cli_lastname')}
            />
          </div>
          <div className="col-sm-18">
            <InputText
              label="Prénom"
              name="cli_firstname"
              id="cli_firstname"
              value={values.cli_firstname}
              onChange={handleChange}
              error={getErrorMessage('cli_firstname')}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-18">
            <InputSelect
              label="Type"
              name="client_type.id"
              value={values.client_type ? values.client_type.id : null}
              onChange={handleChange}
              options={clientTypeAsOptions(props.client_types)}
              error={getErrorMessage('client_type')}
            />
          </div>
          <div className="col-md-18">
            <InputSelect
              label="Catégorie"
              name="client_category.id"
              value={values.client_category ? values.client_category.id : null}
              onChange={handleChange}
              options={clientCategoryAsOptions(props.client_categories)}
              error={getErrorMessage('client_category')}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-36">
            <InputText
              label="Adresse"
              name="cli_address1"
              value={values.cli_address1}
              onChange={handleChange}
              error={getErrorMessage('cli_address1')}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-9">
            <InputText
              label="CP"
              name="cli_cp"
              value={values.cli_cp}
              onChange={handleChange}
              error={getErrorMessage('cli_cp')}
            />
          </div>
          <div className="col-sm-27">
            <InputText
              label="Commune"
              name="cli_town"
              value={values.cli_town}
              onChange={handleChange}
              error={getErrorMessage('cli_town')}
            />
          </div>
        </div>
      </div>
    </ResponsiveForm>
  );
}

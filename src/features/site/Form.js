import React, { Component } from 'react';
import { InputHidden, InputText, InputSelect, ButtonSubmit, ButtonCancel } from '../layout';
import { siteTypeAsOptions } from '../site-type/functions.js';
import useForm from '../layout/useForm';

export default function Form(props) {
  const { values, handleChange, handleSubmit, handleCancel } = useForm(
    props.item,
    props.onSubmit,
    props.onCancel,
  );
  return (
    <div className="card">
      <form>
        <div className="card-header">Sites</div>
        <div className="card-body">
          <InputHidden name="id" id="id" value={values.id} />
          <InputText
            label="Nom"
            required={true}
            name="site_name"
            value={values.site_name}
            onChange={handleChange}
          />
          <InputText
            label="Adresse 1"
            name="site_address1"
            value={values.site_address1}
            onChange={handleChange}
          />
          <InputText
            label="Adresse 2"
            name="site_address2"
            value={values.site_address2}
            onChange={handleChange}
          />
          <InputText
            label="Adresse 3"
            name="site_address3"
            value={values.site_address3}
            onChange={handleChange}
          />
          <InputText
            label="Code postal"
            name="site_cp"
            value={values.site_cp}
            onChange={handleChange}
          />
          <InputText
            label="Ville"
            name="site_town"
            value={values.site_town}
            onChange={handleChange}
          />
          <InputSelect
            label="Type"
            name="site_type.id"
            required={true}
            value={values.site_type.id}
            onChange={handleChange}
            options={siteTypeAsOptions(props.site_types)}
            addempty={true}
          />
        </div>
        <div className="card-footer text-right">
          <ButtonSubmit onClick={handleSubmit} />
          &nbsp;
          <ButtonCancel onClick={handleCancel} />
        </div>
      </form>
    </div>
  );
}

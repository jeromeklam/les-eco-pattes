import React, { Component } from 'react';
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
    <FormResponsive title="Email" onSubmit={handleSubmit} onCancel={handleCancel}>
      <div className="card-body">
        <InputHidden name="id" id="id" value={values.id} />
        <InputText
          label="Code"
          name="email_code"
          id="email_code"
          value={values.email_code}
          onChange={handleChange}
        />
        <InputSelect
          label="Langue"
          name="lang.id"
          required={true}
          value={values.lang.id}
          onChange={handleChange}
          options={props.langs}
          addempty={true}
        />
        <InputText
          label="Sujet"
          name="email_subject"
          id="email_subject"
          value={values.email_subject}
          onChange={handleChange}
        />
        <InputText
          label="Email expéditeur"
          name="email_from"
          id="email_from"
          value={values.email_from}
          onChange={handleChange}
        />
        <InputText
          label="Nom expéditeur"
          name="email_from_name"
          id="email_from_name"
          value={values.email_from_name}
          onChange={handleChange}
        />
        <InputText
          label="Email retour"
          name="email_reply_to"
          id="email_reply_to"
          value={values.email_reply_to}
          onChange={handleChange}
        />
        <InputText
          label="Corps"
          name="email_body"
          id="email_body"
          value={values.email_body}
          onChange={handleChange}
        />
      </div>
    </FormResponsive>
  );
}
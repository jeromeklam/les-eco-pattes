import React from 'react';
import { InputHidden, InputText, InputSelect, InputCheckbox } from 'react-bootstrap-front';
import { InputPicker as ClientInputPicker } from '../client';
import { ResponsiveModalOrForm, useForm, InputDate, InputTextarea } from '../ui';
import { stockSelect, typeSelect } from './';

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
    <ResponsiveModalOrForm
      className=""
      title="Article"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onClose={props.onClose}
      modal={props.modal || false}
    >
      <InputHidden name="id" id="id" value={values.id} />
      <div className="card-body">
        <div className="row">
          <div className="col-sm-14">
            <InputText
              label="Nom"
              name="item_name"
              id="item_name"
              value={values.item_name}
              onChange={handleChange}
              error={getErrorMessage('item_name')}
            />
          </div>
          <div className="col-sm-8">
            <InputSelect
              label="Type"
              name="item_stock"
              id="item_stock"
              value={values.item_stock}
              onChange={handleChange}
              options={stockSelect}
              error={getErrorMessage('item_stock')}
            />
          </div>
          <div className="col-sm-8">
            <InputSelect
              label="Type"
              name="item_type"
              id="item_type"
              value={values.item_type}
              onChange={handleChange}
              options={typeSelect}
              error={getErrorMessage('item_type')}
            />
          </div>
          <div className="col-sm-6">
            <InputText
              label="Code"
              name="item_code"
              id="item_code"
              value={values.item_code}
              onChange={handleChange}
              error={getErrorMessage('item_code')}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-14">
            <ClientInputPicker
              label="Fournisseur par défaut"
              key="default_provider"
              name="default_provider"
              item={values.default_provider || null}
              onChange={handleChange}
              error={getErrorMessage('default_provider')}
            />
          </div>
          <div className="col-8">
            <InputDate
              label="Entrée"
              name="item_from"
              id="item_from"
              value={values.item_from}
              onChange={handleChange}
              error={getErrorMessage('item_from')}
            />
          </div>
          <div className="col-8">
            <InputDate
              label="Sortie"
              name="item_to"
              id="item_to"
              value={values.item_to}
              onChange={handleChange}
              labelTop={true}
            />
          </div>
          <div className="col-6">
            <InputCheckbox
              label="Dangereux"
              name="item_dangerous"
              id="item_dangerous"
              checked={values.item_dangerous}
              onChange={handleChange}
              labelTop={true}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-36">
            <InputTextarea
              label="Description"
              name="item_desc"
              id="item_desc"
              value={values.item_desc}
              onChange={handleChange}
              error={getErrorMessage('item_desc')}
            />
          </div>
        </div>
      </div>
    </ResponsiveModalOrForm>
  );
}

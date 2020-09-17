import React from 'react';
import {
  InputHidden,
  InputText,
} from 'freeassofront';
import useForm from '../ui/useForm';
import { ResponsiveModalOrForm, InputDate } from '../ui';
import { InputPicker as SiteInputPicker } from '../site';

export default function Form(props) {
  const {
    values,
    handleChange,
    handleSubmit,
    handleCancel,
    handleNavTab,
    getErrorMessage,
  } = useForm(props.item, props.tab, props.onSubmit, props.onCancel, props.onNavTab, props.errors);
  return (
    <ResponsiveModalOrForm
      title="Contrat"
      tab={values.currentTab}
      tabs={props.tabs}
      size="md"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onNavTab={handleNavTab}
      onClose={props.onClose}
      modal={props.modal || false}
    >
      <div className="card-body">
        <InputHidden name="id" id="id" value={values.id} />
        <div className="row">
          <div className="col-sm-20">
            <InputText
              label="Numéro"
              name="ct_code"
              id="ct_code"
              required={true}
              mask={'0000.00'}
              value={values.ct_code}
              onChange={handleChange}
              error={getErrorMessage('ct_code')}
            />
          </div>
          <div className="col-sm-16">
            <InputDate
              label="Date"
              name="ct_from"
              id="ct_from"
              required={true}
              value={values.ct_from}
              onChange={handleChange}
              error={getErrorMessage('ct_from')}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-20">
            <SiteInputPicker
              label="Site"
              key="site"
              name="site"
              labelTop={true}
              required={true}
              item={values.site || null}
              onChange={handleChange}
              error={getErrorMessage('site')}
            />
          </div>
        </div>
      </div>
    </ResponsiveModalOrForm>
  );
}

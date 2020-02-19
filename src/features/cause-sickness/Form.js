import React from 'react';
import { InputText, InputTextarea, InputSelect } from 'freeassofront';
import { InputDate, ResponsiveModalOrForm } from '../ui';
import useForm from '../ui/useForm';
import { InputPicker as SicknessInputPicker } from '../sickness';
import { InputPicker as ClientInputPicker } from '../client';
import { SimpleValid as SimpleValidIcon } from '../icons';
import { careSelect, whereSelect } from './';

export default function Form(props) {
  if (props.cause) {
    props.item.cause = props.cause;
  }
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
      title="Maladie"
      tab={values.currentTab}
      tabs={props.tabs}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onNavTab={handleNavTab}
      onClose={props.onClose}
      modal={props.modal || false}
    >
      <div className="card-body">
        <div className="row row-line row-new">
          <div className="col-10">
            <InputDate
              label="Du"
              name="caus_from"
              labelTop={true}
              required={true}
              labelSize={0}
              inputSize={36}
              value={values.caus_from || ''}
              onChange={handleChange}
              error={getErrorMessage('caus_from')}
            />
          </div>
          <div className="col-10">
            <InputDate
              label="Au"
              name="caus_to"
              labelTop={true}
              required={true}
              labelSize={0}
              inputSize={36}
              value={values.caus_to || ''}
              onChange={handleChange}
              error={getErrorMessage('caus_to')}
            />
          </div>
          <div className="col-16">
            <SicknessInputPicker
              label="Maladie"
              name="sickness"
              item={values.sickness || null}
              onChange={handleChange}
              labelTop={true}
              labelSize={0}
              inputSize={36}
              error={getErrorMessage('sickness')}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-10">
            <InputSelect
              label="Lieu"
              name="caus_where"
              labelTop={true}
              required={true}
              labelSize={0}
              inputSize={36}
              value={values.caus_where || ''}
              onChange={handleChange}
              options={whereSelect}
            />
          </div>
          <div className="col-10">
            <InputSelect
              label="Soins"
              name="caus_care"
              labelTop={true}
              required={true}
              labelSize={0}
              inputSize={36}
              value={values.caus_care || ''}
              onChange={handleChange}
              options={careSelect}
            />
          </div>
          <div className="col-16">
            <ClientInputPicker
              label="Vétérinaire"
              name="sanitary"
              item={values.sanitary || null}
              onChange={handleChange}
              labelTop={true}
              labelSize={0}
              inputSize={36}
              error={getErrorMessage('sanitary')}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-36">
            <InputTextarea
              label="Description des soins"
              name="caus_care_desc"
              value={values.caus_care_desc}
              onChange={handleChange}
              error={getErrorMessage('caus_care_desc')}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-36">
            <InputTextarea
              label="Commentaires"
              name="caus_desc"
              value={values.caus_desc}
              onChange={handleChange}
              error={getErrorMessage('caus_desc')}
            />
          </div>
        </div>
      </div>
    </ResponsiveModalOrForm>
  );
}

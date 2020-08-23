import React from 'react';
import { InputSelect } from 'freeassofront';
import { InputDate, ResponsiveModalOrForm } from '../ui';
import useForm from '../ui/useForm';

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
      title="Suivi"
      tab={values.currentTab}
      tabs={props.tabs}
      size="xl"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onNavTab={handleNavTab}
      onClose={props.onClose}
      modal={props.modal || false}
    >
      <div className="row">
        <div className="col-10">
          <InputDate
            label="Du"
            name="alert_from"
            labelTop={true}
            required={true}
            labelSize={0}
            inputSize={36}
            value={values.alert_from || ''}
            onChange={handleChange}
            error={getErrorMessage('alert_from')}
          />
        </div>
      </div>
    </ResponsiveModalOrForm>
  );
}

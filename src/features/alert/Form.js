import React from 'react';
import { InputText, InputSelect, InputCheckbox } from 'freeassofront';
import { useForm, InputDate, InputSpin, ResponsiveModalOrForm } from '../ui';
import { alertPriority, alertRecurType, alertRemind, getAlertRecur } from './';

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
  const today = new Date();
  let libRecur = getAlertRecur(values)
  return (
    <ResponsiveModalOrForm
      title="Suivi"
      tab={values.currentTab}
      tabs={props.tabs}
      size="lg"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onNavTab={handleNavTab}
      onClose={props.onClose}
      modal={props.modal || false}
    >
      <div className="row">
        <div className="col-10">
          <InputDate
            label="Date"
            name="alert_from"
            labelTop={true}
            required={true}
            value={values.alert_from || today}
            onChange={handleChange}
            error={getErrorMessage('alert_from')}
          />
        </div>
        <div className="col-20">
          <InputText
            label="Libellé"
            name="alert_title"
            key="alert_title"
            labelTop={true}
            value={values.alert_title}
            onChange={handleChange}
            error={getErrorMessage('alert_title')}
          />
        </div>
        <div className="col-6">
          <InputSelect
            label="Priorité"
            id="alert_priority"
            name="alert_priority"
            value={values.alert_priority}
            defaultValue="NONE"
            onChange={handleChange}
            options={alertPriority}
            error={getErrorMessage('alert_priority')}
          />
        </div>
      </div>
      <div className="row"> 
        <div className="col-5">
          <InputSelect
            label="Récurrence"
            id="alert_recur_type"
            name="alert_recur_type"
            value={values.alert_recur_type}
            defaultValue="NONE"
            onChange={handleChange}
            options={alertRecurType}
            error={getErrorMessage('alert_recur_type')}
          />
        </div>
        <div className="col-9">
          {(libRecur !== '') && (
            <InputSpin
              label={libRecur}
              name="alert_recur_number"
              id="alert_recur_number"
              value={values.alert_recur_number}
              maxValue={99}
              minValue={0}
              onChange={handleChange}
              labelTop={true}
              error={getErrorMessage('alert_recur_number')}
            />
          )}
        </div>
        <div className="col-19"></div>
        <div className="col-3">
          <InputCheckbox
            label="Actif"
            name="alert_activ"
            labelTop={true}
            checked={values.alert_activ === true}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row"> 
        <div className="col-10">
          <InputDate
            label="Echéance"
            name="alert_deadline"
            labelTop={true}
            value={values.alert_deadline || ''}
            onChange={handleChange}
            error={getErrorMessage('alert_deadline')}
          />
        </div>
        <div className="col-sm-13">
          <InputSelect
            label="Premier rappel avant échéance"
            name="alert_email_1"
            labelTop={true}
            options={alertRemind}
            value={values.alert_email_1}
            onChange={handleChange}
            error={getErrorMessage('alert_email_1')}
          />
        </div>
        <div className="col-sm-13">
          <InputSelect
            label="Deuxième rappel avant échéance"
            name="alert_email_2"
            labelTop={true}
            options={alertRemind}
            value={values.alert_email_2}
            onChange={handleChange}
            error={getErrorMessage('alert_email_2')}
          />
        </div>
      </div>
    </ResponsiveModalOrForm>
  );
}

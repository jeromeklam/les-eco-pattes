import React from 'react';
import { InputText, InputSelect, InputCheckbox } from 'react-bootstrap-front';
import {
  useForm,
  InputDate,
  InputDatetime,
  InputSpin,
  InputTextarea,
  ResponsiveModalOrForm,
  InputCheckList,
} from '../ui';
import { InputPicker as UserInputPicker } from '../user';
import { InputPicker as SiteInputPicker } from '../site';
import { InputPicker as CauseInputPicker } from '../cause';
import { InputPicker as ContractInputPicker } from '../contract';
import { InputPicker as ClientInputPicker } from '../client';
import { alertPriority, alertRecurType, alertRemind, getAlertRecur } from './';

const objects = [
  { value: '', label: 'Aucun' },
  { value: 'FreeAsso_Cause', label: 'Animal' },
  { value: 'FreeAsso_Contract', label: 'Contrat' },
  { value: 'FreeAsso_Client', label: 'Personne' },
  { value: 'FreeAsso_Site', label: 'Site' },
];

const afterChange = (name, item) => {
  switch (name) {
    case 'alert_from':
      const dateFrom1 = new Date(item.alert_from) || null;
      const dateTo1 = new Date(item.alert_to) || null;
      if (dateTo1 === null || dateTo1 < dateFrom1) {
        item.alert_to = item.alert_from;
      }
      break;
    case 'alert_to':
      const dateFrom2 = new Date(item.alert_from) || null;
      const dateTo2 = new Date(item.alert_to) || null;
      if (dateFrom2 === null || dateTo2 < dateFrom2) {
        item.alert_from = item.alert_to;
      }
      break;
    default:
      break;
  }
};

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
  } = useForm(
    props.item,
    props.tab,
    props.onSubmit,
    props.onCancel,
    props.onNavTab,
    props.errors,
    afterChange,
  );
  const today = new Date();
  if (!values.alert_from) {
    values.alert_from = today;
  }
  if (!values.alert_to) {
    values.alert_to = today;
  }
  let libRecur = getAlertRecur(values);
  return (
    <ResponsiveModalOrForm
      title={values.alert_title}
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
        <div className="col-9">
          <InputDatetime
            label="Du"
            name="alert_from"
            labelTop={true}
            required={true}
            value={values.alert_from}
            onChange={handleChange}
            error={getErrorMessage('alert_from')}
          />
        </div>
        <div className="col-9">
          <InputDatetime
            label="au"
            name="alert_to"
            labelTop={true}
            required={true}
            value={values.alert_to}
            onChange={handleChange}
            error={getErrorMessage('alert_to')}
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
        <div className="col-3">
          <InputCheckbox
            label="Actif"
            name="alert_activ"
            labelTop={true}
            checked={values.alert_activ === true}
            onChange={handleChange}
          />
        </div>
        <div className="col-9">
          <InputDate
            label="Echéance"
            name="alert_deadline"
            labelTop={true}
            value={values.alert_deadline || ''}
            onChange={handleChange}
            error={getErrorMessage('alert_deadline')}
          />
        </div>
      </div>
      <hr />
      {values.currentTab === '1' && (
        <div>
          <div className="row">
            <div className="col-27">
              <InputText
                label="Libellé"
                name="alert_title"
                key="alert_title"
                labelTop={true}
                value={values.alert_title}
                required={true}
                onChange={handleChange}
                error={getErrorMessage('alert_title')}
              />
            </div>
            <div className="col-9">
              <InputDatetime
                label="Réalisée le"
                name="alert_done_ts"
                labelTop={true}
                value={values.alert_done_ts}
                onChange={handleChange}
                error={getErrorMessage('alert_done_ts')}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-7">
              <InputSelect
                label="Elément lié"
                id="alert_object_name"
                name="alert_object_name"
                value={values.alert_object_name}
                defaultValue=""
                onChange={handleChange}
                options={objects}
                error={getErrorMessage('alert_object_name')}
              />
            </div>
            <div className="col-20">
              {
                {
                  FreeAsso_Cause: (
                    <CauseInputPicker
                      label="Animal"
                      key="object"
                      name="object"
                      item={values.object || null}
                      onChange={handleChange}
                      labelTop={true}
                      required={true}
                      error={getErrorMessage('object')}
                    />
                  ),
                  FreeAsso_Contract: (
                    <ContractInputPicker
                      label="Contrat"
                      key="object"
                      name="object"
                      item={values.object || null}
                      onChange={handleChange}
                      labelTop={true}
                      required={true}
                      error={getErrorMessage('object')}
                    />
                  ),
                  FreeAsso_Client: (
                    <ClientInputPicker
                      label="Personne"
                      key="object"
                      name="object"
                      item={values.object || null}
                      onChange={handleChange}
                      labelTop={true}
                      required={true}
                      error={getErrorMessage('object')}
                    />
                  ),
                  FreeAsso_Site: (
                    <SiteInputPicker
                      label="Site"
                      key="object"
                      name="object"
                      item={values.object || null}
                      onChange={handleChange}
                      labelTop={true}
                      required={true}
                      error={getErrorMessage('object')}
                    />
                  ),
                }[values.alert_object_name]
              }
            </div>
            <div className="col-9">
              <UserInputPicker
                label="Utilisateur"
                key="user"
                name="user"
                pickerUp={true}
                item={values.user || null}
                onChange={handleChange}
                error={getErrorMessage('user')}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-36">
              <InputTextarea
                label="Commentaires"
                name="alert_done_text"
                value={values.alert_done_text}
                onChange={handleChange}
                labelTop={true}
                error={getErrorMessage('alert_done_text')}
              />
            </div>
          </div>
        </div>
      )}
      {values.currentTab === '2' && (
        <div>
          <div className="row">
            <div className="col-36">
              <InputTextarea
                label="Description"
                name="alert_text"
                value={values.alert_text}
                onChange={handleChange}
                labelTop={true}
                error={getErrorMessage('alert_text')}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-26">
              <InputCheckList
                label=""
                name="alert_checklist"
                value={values.alert_checklist}
                onChange={handleChange}
                error={getErrorMessage('alert_checklist')}
              />
            </div>
          </div>
        </div>
      )}
      {values.currentTab === '3' && (
        <div>
          <div className="row">
            <div className="col-6">
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
            <div className="col-12">
              {libRecur !== '' && (
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
          </div>
          <div className="row">
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
        </div>
      )}
    </ResponsiveModalOrForm>
  );
}

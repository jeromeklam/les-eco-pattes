import React from 'react';
import { InputText, InputSelect } from 'freeassofront';
import { InputPicker as InputPickerSite } from '../site';
import { InputDate } from '../ui';
import useForm from '../ui/useForm';
import { SimpleValid as SimpleValidIcon } from '../icons';

export default function InlineMovementForm(props) {
  if (props.cause) {
    props.item.cause = props.cause;
    props.item.from_site = props.cause.site;
  }
  const { values, handleChange, handleSubmit, getErrorMessage } = useForm(
    props.item,
    props.tab,
    props.onSubmit,
    props.onCancel,
    props.onNavTab,
    props.errors,
  );
  return (
    <form className="inline-form">
      <div className="row">
        <div className="col-10 col-first">
          <InputPickerSite
            label="De"
            key="from_site"
            name="from_site"
            size="sm"
            labelSize={6}
            inputSize={30}
            required={true}
            item={values.from_site || ''}
            onChange={handleChange}
            labelTop={false}
            error={getErrorMessage('camv_site_from_id')}
          />
        </div>
        <div className="col-10">
          <InputDate
            label="Départ"
            name="camv_start"
            labelTop={false}
            size="sm"
            required={true}
            labelSize={10}
            inputSize={26}
            value={values.camv_start || ''}
            onChange={handleChange}
            error={getErrorMessage('camv_start')}
          />
        </div>
        <div className="col-13">
          <InputText
            label="Notes"
            name="camv_comment"
            labelTop={false}
            size="sm"
            required={false}
            labelSize={6}
            inputSize={30}
            value={values.camv_comment || ''}
            onChange={handleChange}
          />
        </div>
        <div className="col-3 my-auto text-right">
          <button type="button" className="btn btn-inline btn-primary" onClick={handleSubmit}>
            <SimpleValidIcon className="inline-action text-light" />
          </button>
        </div>
        <div className="col-10 col-first">
          <InputPickerSite
            label="Vers"
            key="to_site"
            name="to_site"
            size="sm"
            required={true}
            labelSize={6}
            inputSize={30}
            item={values.to_site || ''}
            onChange={handleChange}
            labelTop={false}
            error={getErrorMessage('camv_site_to_id')}
          />
        </div>
        <div className="col-10">
          <InputDate
            label="Arrivée"
            name="camv_to"
            labelTop={false}
            size="sm"
            required={true}
            labelSize={10}
            inputSize={26}
            value={values.camv_to || ''}
            onChange={handleChange}
            error={getErrorMessage('camv_to')}
          />
        </div>
        <div className="col-13">
          <InputSelect
            label="Statut"
            name="camv_status"
            labelTop={false}
            size="sm"
            labelSize={6}
            inputSize={30}
            value={values.camv_status || 'OK'}
            onChange={handleChange}
            options={[
              { value: 'OK', label: 'Effectué' },
              { value: 'WAIT', label: 'A valider' },
              { value: 'KO', label: 'Autre' },
            ]}
            error={getErrorMessage('camv_status')}
          />
        </div>
      </div>
    </form>
  );
}

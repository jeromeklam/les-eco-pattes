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
  const { values, handleChange, handleSubmit } = useForm(
    props.item,
    props.tab,
    props.onSubmit,
    props.onCancel,
    props.onNavTab,
  );
  return (
    <form className="inline-form">
      <div className="row">
        <div className="col-10">
          <InputPickerSite
            label="De"
            key="from_site"
            name="from_site"
            size="sm"
            labelSize={6}
            inputSize={30}
            item={values.from_site || ''}
            onChange={handleChange}
            labelTop={false}
          />
        </div>
        <div className="col-10">
          <InputDate
            label="Départ"
            name="camv_start"
            labelTop={false}
            size="sm"
            labelSize={10}
            inputSize={26}
            value={values.camv_start || ''}
            onChange={handleChange}
          />
        </div>
        <div className="col-13">
          <InputText
            label="Note"
            name="camv_comment"
            labelTop={false}
            size="sm"
            labelSize={6}
            inputSize={30}
            value={values.camv_comment || ''}
            onChange={handleChange}
          />
        </div>
        <div className="col-3" onClick={handleSubmit}>
          <SimpleValidIcon className="text-secondary inline-action" />
        </div>
        <div className="col-10">
          <InputPickerSite
            label="Vers"
            key="to_site"
            name="to_site"
            size="sm"
            labelSize={6}
            inputSize={30}
            item={values.to_site || ''}
            onChange={handleChange}
            labelTop={false}
          />
        </div>
        <div className="col-10">
          <InputDate
            label="Arrivée"
            name="camv_to"
            labelTop={false}
            size="sm"
            labelSize={10}
            inputSize={26}
            value={values.camv_to || ''}
            onChange={handleChange}
          />
        </div>
        <div className="col-13">
          <InputSelect
            label="Status"
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
          />
        </div>
      </div>
    </form>
  );
}

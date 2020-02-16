import React from 'react';
import { InputText, InputTextarea, InputSelect } from 'freeassofront';
import { InputDate } from '../ui';
import useForm from '../ui/useForm';
import { InputPicker as SicknessInputPicker } from '../sickness';
import { SimpleValid as SimpleValidIcon } from '../icons';
import { careSelect, whereSelect } from './';

export default function InlineSicknessForm(props) {
  if (props.cause) {
    props.item.cause = props.cause;
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
    <div className="row row-line row-new">
      <div className="col-6">
        <InputDate
          label=""
          name="caus_from"
          labelTop={false}
          size="sm"
          required={true}
          labelSize={0}
          inputSize={36}
          value={values.caus_from || ''}
          onChange={handleChange}
          error={getErrorMessage('caus_from')}
        />
      </div>
      <div className="col-6">
        <InputDate
          label=""
          name="caus_to"
          labelTop={false}
          size="sm"
          required={true}
          labelSize={0}
          inputSize={36}
          value={values.caus_to || ''}
          onChange={handleChange}
          error={getErrorMessage('caus_to')}
        />
      </div>
      <div className="col-6">
        <InputSelect
          label=""
          name="caus_where"
          labelTop={false}
          size="sm"
          required={false}
          labelSize={0}
          inputSize={36}
          value={values.caus_where || ''}
          onChange={handleChange}
          options={whereSelect}
        />
      </div>
      <div className="col-6">
        <InputSelect
          label=""
          name="caus_care"
          labelTop={false}
          size="sm"
          required={false}
          labelSize={0}
          inputSize={36}
          value={values.caus_care || ''}
          onChange={handleChange}
          options={careSelect}
        />
      </div>
      <div className="col-8">
        <SicknessInputPicker
          label=""
          name="sickness"
          item={values.sickness || null}
          onChange={handleChange}
          labelTop={false}
          size="sm"
          labelSize={0}
          inputSize={36}
          error={getErrorMessage('sickness')}
        />
      </div>
      <div className="col-4" onClick={handleSubmit}>
        <SimpleValidIcon className="text-primary inline-action" />
      </div>
    </div>
  );
}

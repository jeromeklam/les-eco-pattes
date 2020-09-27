import React from 'react';
import { InputText, InputSelect } from 'react-bootstrap-front';
import { InputPicker as InputPickerCause } from '../cause';
import useForm from '../ui/useForm';
import { SimpleValid as SimpleValidIcon } from '../icons';
import { mvtStatus } from './';

export default function InlineCauseForm(props) {
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
          <InputPickerCause
            label="Animal"
            key="cause"
            name="cause"
            size="sm"
            labelSize={10}
            inputSize={26}
            required={true}
            item={values.cause || ''}
            onChange={handleChange}
            labelTop={false}
            error={getErrorMessage('cau_id')}
          />
        </div>
        <div className="col-14">
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
        <div className="col-10">
          <InputSelect
            label="Statut"
            name="camv_status"
            labelTop={false}
            size="sm"
            labelSize={6}
            inputSize={30}
            defaultValue='WAIT'
            value={values.camv_status || 'WAIT'}
            onChange={handleChange}
            options={mvtStatus}
            error={getErrorMessage('camv_status')}
          />
        </div>
        <div className="col-2 my-auto text-right">
          <button type="button" className="btn btn-inline btn-primary" onClick={handleSubmit}>
            <SimpleValidIcon className="inline-action text-light" />
          </button>
        </div>
      </div>
    </form>
  );
}

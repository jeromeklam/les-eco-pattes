import React from 'react';
import {
  InputHidden,
  InlineInputSelect,
  InlineLabel,
  InlineInputText,
  InlineInputCheckbox,
} from 'freeassofront';
import { InputPicker as InputPickerSite } from '../site';
import { InputDate } from '../ui';
import useForm from '../ui/useForm';
import { SimpleValid as SimpleValidIcon } from '../icons';

export default function InlineMovementForm(props) {
  const { values, handleChange, handleSubmit, handleCancel, handleNavTab } = useForm(
    props.item,
    props.tab,
    props.onSubmit,
    props.onCancel,
    props.onNavTab,
  );
  return (
    <form>
      <div className="row">
        <div className="col-13">
          <InputPickerSite
            label="Vers"
            key="to_site"
            name="to_site"
            size="sm"
            item={values.to_site || null}
            onChange={handleChange}
            labelTop={false}
          />
        </div>
        <div className="col-10">
          <InputDate
            label="Départ"
            name="camv_from"
            labelTop={false}
            size="sm"
            labelSize={10}
            inputSize={26}
            value={values.camv_from}
            onChange={handleChange}
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
            value={values.camv_to}
            onChange={handleChange}
          />
        </div>
        <div className="col-3">
          <SimpleValidIcon className="text-secondary inline-action" />
        </div>
      </div>
    </form>
  );
}

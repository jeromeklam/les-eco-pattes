import React from 'react';
import { InputText } from 'freeassofront';
import { InputDate } from '../ui';
import useForm from '../ui/useForm';
import { SimpleValid as SimpleValidIcon } from '../icons';

export default function InlineGrowthForm(props) {
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
    <div className="row row-line row-new">
      <div className="col-16">
        <InputDate
          label=""
          name="grow_ts"
          labelTop={false}
          size="sm"
          required={true}
          labelSize={0}
          inputSize={36}
          value={values.grow_ts || ''}
          onChange={handleChange}
          error={getErrorMessage('grow_ts')}
        />
      </div>
      <div className="col-8">
        <InputText
          label=""
          name="grow_weight"
          labelTop={false}
          size="sm"
          required={false}
          labelSize={0}
          inputSize={36}
          value={values.grow_weight || ''}
          onChange={handleChange}
        />
      </div>
      <div className="col-8">
        <InputText
          label=""
          name="grow_height"
          labelTop={false}
          size="sm"
          required={false}
          labelSize={0}
          inputSize={36}
          value={values.grow_height || ''}
          onChange={handleChange}
        />
      </div>
      <div className="col-4" onClick={handleSubmit}>
        <SimpleValidIcon className="text-primary inline-action" />
      </div>
    </div>
  );
}
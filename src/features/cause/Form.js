import React from 'react';
import { 
  InputHidden, 
  InputText, 
  InputSelect,
  InputData,
  InputDate,
  InputPicker,
  FormResponsive } from '../layout';
import useForm from '../layout/useForm';
import { causeTypeAsOptions } from '../cause-type/functions.js';

export default function Form(props) {
  const { values, handleChange, handleSubmit, handleCancel } = useForm(
    props.item,
    '',
    props.onSubmit,
    props.onCancel,
  );
  return (
    <FormResponsive title="Animaux" onSubmit={handleSubmit} onCancel={handleCancel}>
      <InputHidden name="id" id="id" value={values.id} />
      <div className="row">
        <div className="col-36">
          <InputText
            label="Identification"
            name="cau_name"
            id="cau_name"
            value={values.cau_name}
            onChange={handleChange}            
          />
        </div>
        <div className="col-36">
          <InputDate
            label="Depuis"
            name="cau_from"
            id="cau_from"
            value={values.cau_from}
            onChange={handleChange}            
          />
        </div>
        <div className="col-36" >
          <InputSelect
            label="Race"
            name="cause_type.id" 
            value={values.cause_type ? values.cause_type.id : null}            
            addempty={true}
            onChange={handleChange}
            options={causeTypeAsOptions(props.cause_types)}
          />
        </div>
        <div className="col-36">
          <InputData 
            key="cau_string_1"
            name="cau_string_1"
            value={values.cau_string_1}
            datas={props.tab_datas}
            config={props.tab_configs}
            onChange={handleChange}
          />          
        </div>
        <div className="col-36">
          <InputPicker 
            label="Site"
            key="site.id"
            name="site.id"
            value={values.site && values.site.id}
            content={values.site && values.site.site_name}
            onChange={handleChange}
            pickerAutocomplete="/v1/asso/site/autocomplete/"
            pickerId="site_id"
            pickerValue="site_name"
          />          
        </div>
      </div>
    </FormResponsive>
  );
}

import React, { Component } from 'react';
import { 
  InputHidden, 
  InputText, 
  InputSelect,
  InputData,
  FormResponsive } from '../layout';
import useForm from '../layout/useForm';
import { causeTypeAsOptions } from '../cause-type/functions.js';
import { causeMainTypeAsOptions } from '../cause-main-type/functions.js';

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
        <div className="col-sm-20">
          <InputText
            label="Identification"
            name="cau_name"
            id="cau_name"
            value={values.cau_name}
            onChange={handleChange}            
          />
        </div>
        <div className="col-sm-16">
        </div>
        <div className="col-sm-12" >
          <InputSelect
            label="Race"
            name="cause_type.id" 
            value={values.cause_type ? values.cause_type.id : null}            
            addempty={true}
            onChange={handleChange}
            options={causeTypeAsOptions(props.cause_types)}
          />
        </div>
        <div className="col-sm-12">
          <InputData 
            key="cau_string_1"
            name="cau_string_1"
            value={values.cau_string_1}
            datas={props.tab_datas}
            config={props.tab_configs}
            onChange={handleChange}
          />          
        </div>
      </div>
    </FormResponsive>
  );
}

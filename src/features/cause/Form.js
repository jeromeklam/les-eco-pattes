import React, { Component } from 'react';
import { 
  InputHidden, 
  InputText, 
  InputSelect,
  InputData,
  FormResponsive } from '../layout';
import useForm from '../layout/useForm';
import { dataAsOptions } from '../data/functions.js';
import { configAsOptions } from '../config/functions.js';
import { causeTypeAsOptions } from '../cause-type/functions.js';
import { causeMainTypeAsOptions } from '../cause-main-type/functions.js';

export default function Form(props) {
  const { values, handleChange, handleSubmit, handleCancel } = useForm(
    props.item,
    '',
    props.onSubmit,
    props.onCancel,
  );
  //{ name: "sex", label: "M/F", col: "cau_string_1", size:"4", mob_size: "18", title: false},
  //{ name: "color", label: "Couleur", col: "cau_string_2", size:"4", mob_size: "18", title: false},
  //{ name: "site", label: "Site", col: "site.site_town", size:"9", mob_size: "", title: false},
  console.log("Form cause",props);
  return (
    <FormResponsive title="Animaux" onSubmit={handleSubmit} onCancel={handleCancel}>
      <InputHidden name="id" id="id" value={values.id} />
      <div className="row">
        <div className="col-sm-36">
          <InputText
            label="Identification"
            name="cau_name"
            id="cau_name"
            value={values.cau_name}
            onChange={handleChange}            
          />
        </div>
        <div className="col-sm-12">
          <InputSelect
            label="Espèce"
            name="camt_name"    
            value={values.cause_type.cause_main_type.id}        
            required={true}
            addempty={true}
            onChange={handleChange}                     
            options={causeMainTypeAsOptions(props.cause_main_types)}
          />
        </div>
        <div className="col-sm-12" >
          <InputSelect
            label="Race"
            name="caut_name" 
            value={values.cause_type.id}            
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
            datas={dataAsOptions(props.tab_datas)}
            config={configAsOptions(props.tab_configs)}
            onChange={handleChange}
          />          
        </div>
      </div>
    </FormResponsive>
  );
}

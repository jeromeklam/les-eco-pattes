import React from 'react';
import {
  InputHidden,
  InputText,
  InputSelect,
  InputData,
  InputDate,
  InputPicker,
  InputTextArea,
  FormResponsive,
} from '../layout';
import useForm from '../layout/useForm';
import { causeTypeAsOptions } from '../cause-type/functions.js';
import { causeMainTypeAsOptions } from '../cause-main-type/functions.js';
import { InputPicker as ClientInputPicker } from '../client';
import { InputPicker as CauseInputPicker } from '.';


export default function Form(props) {
  const { values, handleChange, handleSubmit, handleCancel, handleNavTab } = useForm(
    props.item,
    props.tab,
    props.onSubmit,
    props.onCancel,
    props.onNavTab,
  );
  console.log('FK tab cause', values);
  return (
    <FormResponsive
      title="Animaux"
      tab={values.currentTab}
      tabs={props.tabs}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onNavTab={handleNavTab}
    >
      <InputHidden name="id" id="id" value={values.id} />
      <div className="row"> 
        <div className="col-12">
          <InputText
            label="N° boucle"
            name="cau_name"
            id="cau_name"
            value={values.cau_name}
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <InputSelect
            label="Espèce"
            name="cause_type.cause_main_type.camt_id"
            value={values.cause_type.cause_main_type ? values.cause_type.cause_main_type.id : null}
            addempty={true}
            onChange={handleChange}
            options={causeMainTypeAsOptions(props.cause_main_types)}
          />  
        </div>
        <div className="col-12">
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
      <hr />
      {values.currentTab === '1' && (
        <div>
          <div className="row">
            <div className="col-18">
              <InputData
                key="cau_string_1"
                name="cau_string_1"
                value={values.cau_string_1}
                datas={props.tab_datas}
                config={props.tab_configs}
                onChange={handleChange}
              />
            </div>
            <div className="col-18">
              <InputText
                label="M/F"
                name="cau_sex"
                id="cau_sex"
                value={values.cau_sex}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-36">
            <InputData
              key="cau_number_1"
              name="cau_number_1"
              value={values.cau_number_1}
              datas={props.tab_datas}
              config={props.tab_configs}
              onChange={handleChange}
            />
          </div>
          <div className="row">
            <div className="col-18">
              <CauseInputPicker 
                label="Père"
                key="parent1.id"
                name="parent1.id"
                value={values.parent1 && values.parent1.id}
                content={values.parent1 && values.parent1.cau_name}
                onChange={handleChange}
              />  
            </div>
            <div className="col-18">
              <CauseInputPicker 
                label="Mère"                
                key="parent2.id"
                name="parent2.id"
                value={values.parent2 && values.parent2.id}
                content={values.parent2 && values.parent2.cau_name}
                onChange={handleChange}
              />  
            </div>
          </div>
        </div>
      )}
      {values.currentTab === '2' && (
        <div>
          <div className="col-36">
            <InputDate
              label="Entrée"
              name="cau_from"
              id="cau_from"
              value={values.cau_from}
              onChange={handleChange}
            />
          </div>
          <div className="col-36">
            <InputData
              key="cau_string_2"
              name="cau_string_2"
              value={values.cau_string_2}
              datas={props.tab_datas}
              config={props.tab_configs}
              onChange={handleChange}
            />
          </div>
          <div className="col-36">
            <InputDate
              label="Sortie"
              name="cau_from"
              id="cau_from"
              value={values.cau_from}
              onChange={handleChange}
            />
          </div>
        </div>
      )}
      {values.currentTab === '3' && (
        <div>
         <ClientInputPicker 
            label="Eleveur"
            key="proprietary.id"
            name="proprietary.id"
            value={values.proprietary && values.proprietary.id}
            content={values.proprietary && values.proprietary.cli_lastname}
            onChange={handleChange}
          />     
          <InputTextArea
            label="Observations"
            name="cau_desc"
            value={values.cau_desc}
            onChange={handleChange}
          />
        </div>
      )}
    </FormResponsive>
  );
}

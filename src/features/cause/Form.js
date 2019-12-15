import React from 'react';
import {
  InputHidden,
  InputText,
  InputSelect,
  InputData,
  InputDate,
  InputTextArea,
  FormResponsive,
} from '../layout';
import useForm from '../layout/useForm';
import { causeTypeAsOptions } from '../cause-type/functions.js';
import { causeMainTypeAsOptions } from '../cause-main-type/functions.js';
import { InputPicker as ClientInputPicker } from '../client';
import { InputPicker as SiteInputPicker } from '../site';
import { InputPicker as CauseInputPicker } from './';


export default function Form(props) {
  const { values, handleChange, handleSubmit, handleCancel, handleNavTab } = useForm(
    props.item,
    props.tab,
    props.onSubmit,
    props.onCancel,
    props.onNavTab,
  );
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
          <SiteInputPicker
            label="Site"
            key="site"
            name="site"
            item={values.site || null}
            onChange={handleChange}
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
                key="parent1"
                name="parent1"
                item={values.parent1 || null}
                onChange={handleChange}
              />  
            </div>
            <div className="col-18">
              <CauseInputPicker 
                label="Mère"                
                key="parent2"
                name="parent2"
                item={values.parent2 || null}
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
            key="proprietary"
            name="proprietary"
            item={values.proprietary || null}
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

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

export default function Form(props) {
  const { values, handleChange, handleSubmit, handleCancel, handleNavTab } = useForm(
    props.item,
    props.tab,
    props.onSubmit,
    props.onCancel,
    props.onNavTab,
  );
  console.log('FK tab cause', values.currentTab);
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
      <div className="col-36">
        <InputText
          label="N° boucle"
          name="cau_name"
          id="cau_name"
          value={values.cau_name}
          onChange={handleChange}
        />
      </div>
      <div className="col-18">
        <InputSelect
          label="Race"
          name="cause_type.id"
          value={values.cause_type ? values.cause_type.id : null}
          addempty={true}
          onChange={handleChange}
          options={causeTypeAsOptions(props.cause_types)}
        />
      </div>
      <div className="col-18"></div>
      <hr />
      {values.currentTab === '1' && (
        <div>
          <div className="col-36">
            <InputDate
              label="Depuis"
              name="cau_from"
              id="cau_from"
              value={values.cau_from}
              onChange={handleChange}
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
      )}
      {values.currentTab === '2' && (
        <InputTextArea
          label="Observations"
          name="cau_desc"
          value={values.cau_desc}
          onChange={handleChange}
        />
      )}
    </FormResponsive>
  );
}

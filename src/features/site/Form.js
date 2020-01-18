import React from 'react';
import { InputHidden, InputText, InputSelect, InputTextarea, ResponsiveForm } from 'freeassofront';
import { InputData } from '../ui';
import useForm from '../ui/useForm';
import { siteTypeAsOptions } from '../site-type/functions.js';
import { InputPicker as ClientInputPicker } from '../client';

export default function Form(props) {
  const { values, handleChange, handleSubmit, handleCancel, handleNavTab, getErrorMessage } = useForm(
    props.item,
    props.tab,
    props.onSubmit,
    props.onCancel,
    props.onNavTab,
    props.errors,
  );
  console.log(getErrorMessage("site_name"));
  return (
    <ResponsiveForm
      className=""
      title="Sites"
      tab={values.currentTab}
      tabs={props.tabs}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onNavTab={handleNavTab}
    >
      <InputHidden name="id" id="id" value={values.id} />
      <div className="row">
        <div className="col-sm-18">
          <InputText
            label="Nom"
            required={true}
            is="site_name"
            name="site_name"
            value={values.site_name}
            onChange={handleChange}
            error={getErrorMessage("site_name")}
          />
        </div>
        <div className="col-sm-10">
          <InputSelect
            label="Type"
            id="site_type.id"
            name="site_type.id"
            required={true}
            value={values.site_type ? values.site_type.id : null}
            onChange={handleChange}
            options={siteTypeAsOptions(props.site_types)}
            addempty={true}
            error={getErrorMessage("site_type")}
          />
        </div>
        <div className="col-sm-8">
          <InputText label="N°" name="site_code" value={values.site_code} onChange={handleChange} />
        </div>
      </div>
      <hr />
      {values.currentTab === '1' && (
        <div>
          <InputText
            label="Adresse"
            name="site_address1"
            value={values.site_address1}
            onChange={handleChange}
            labtop={true}
            error={getErrorMessage("site_address1")}
          />
          <div className="row">
            <div className="col-sm-8">
              <InputText
                label="CP"
                name="site_cp"
                value={values.site_cp}
                onChange={handleChange}
                labtop={true}
                error={getErrorMessage("site_cp")}
              />
            </div>
            <div className="col-sm-28">
              <InputText
                label="Commune"
                name="site_town"
                value={values.site_town}
                onChange={handleChange}
                labtop={true}
                error={getErrorMessage("site_town")}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-8">
              <InputText
                label="Surface"
                name="site_area"
                value={values.site_area}
                onChange={handleChange}
                error={getErrorMessage("site_area")}
              />
            </div>
            <div className="col-sm-28">
              <InputText
                label="Parcelles"
                name="site_plots"
                value={values.site_plots}
                onChange={handleChange}
                error={getErrorMessage("site_plots")}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-36">
              <ClientInputPicker
                label="Propriétaire"
                key="owner"
                name="owner"
                item={values.owner || null}
                onChange={handleChange}
                error={getErrorMessage("owner")}
              />
            </div>
          </div>
        </div>
      )}
      {values.currentTab === '2' && (
        <div className="row">
          {props.properties.map(oneProp => {
            let nameProp = 'site_' + oneProp;
            return (
              <div className="col-sm-12">
                <InputData
                  key={nameProp}
                  name={nameProp}
                  value={values[nameProp]}
                  datas={props.datas}
                  config={props.config}
                  addempty={false}
                  onChange={handleChange}
                />
              </div>
            );
          })}
        </div>
      )}
      {values.currentTab === '3' && (
        <div>
          <InputText
            label="N° élevage EDE"
            name="site_code_ex"
            value={values.site_code_ex}
            onChange={handleChange}
            error={getErrorMessage("site_code_ex")}
          />
          <ClientInputPicker
            label="Vétérinaire"
            key="sanitary"
            name="sanitary"
            item={values.sanitary || null}
            onChange={handleChange}
            error={getErrorMessage("sanitary")}
          />
          <InputTextarea
            label="Observations"
            name="site_desc"
            value={values.site_desc}
            onChange={handleChange}
            error={getErrorMessage("site_desc")}
          />
        </div>
      )}
    </ResponsiveForm>
  );
}

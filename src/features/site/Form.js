import React from 'react';
import {
  InputHidden,
  InputText,
  InputSelect,
  InputCheckbox,
} from 'freeassofront';
import RegexpParser from 'reregexp';
import { InputData } from '../ui';
import useForm from '../ui/useForm';
import { siteTypeAsOptions } from '../site-type/functions.js';
import { InputPicker as ClientInputPicker } from '../client';
import { InputPicker as SiteInputPicker } from '../site';
import { Location as LocationIcon, Settings as SettingsIcon, Other as OtherIcon } from '../icons';
import { ResponsiveModalOrForm, InputTextarea } from '../ui';
import { validateRegex } from '../../common';

let regPlaceholder = '';
let sitt_id = 0;

const tabs = [
  {
    key: '1',
    name: 'identification',
    label: 'Identification',
    shortcut: 'L',
    icon: <LocationIcon />,
  },
  {
    key: '2',
    name: 'identification2',
    label: 'Identification (suite)',
    shortcut: 'D',
    icon: <OtherIcon />,
  },
  {
    key: '3',
    name: 'observztion',
    label: 'Observations',
    shortcut: 'O',
    icon: <OtherIcon />,
  },
  { key: '4', name: 'equipement', label: 'Equipement', shortcut: 'E', icon: <SettingsIcon /> },
];

export default function Form(props) {
  const {
    values,
    handleChange,
    handleSubmit,
    handleCancel,
    handleNavTab,
    getErrorMessage,
  } = useForm(props.item, props.tab, props.onSubmit, props.onCancel, props.onNavTab, props.errors);
  const regexp = values.site_type.sitt_pattern || '';
  let validated = true;
  if (regexp !== '') {
    validated = false;
    if (regPlaceholder === '' || sitt_id !== values.site_type.id) {
      const parser = new RegexpParser('/' + regexp + '/',{namedGroupConf:{
        pays: ['FR']
      }});
      regPlaceholder = parser.build();
    }
    if (values.site_code !== '' && validateRegex(values.site_code, regexp)) {
      validated = true;
    }
    sitt_id = values.site_type.id;
  }
  return (
    <ResponsiveModalOrForm
      className=""
      title="Sites"
      tab={values.currentTab}
      tabs={tabs}
      size="xl"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onNavTab={handleNavTab}
      onClose={props.onClose}
      modal={props.modal || false}
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
            error={getErrorMessage('site_name')}
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
            error={getErrorMessage('site_type')}
          />
        </div>
        <div className="col-sm-8">
          <InputText
            label="N° Elevage EDE"
            name="site_code"
            value={values.site_code}
            onChange={handleChange}
            required={true}
            error={getErrorMessage('site_code')}
            warning={validated ? false : 'Format : ' + regPlaceholder}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-18">
          <SiteInputPicker
            label="Site principal"
            key="parent_site"
            name="parent_site"
            item={values.parent_site || null}
            onChange={handleChange}
            labelTop={true}
            error={getErrorMessage('parent_site')}
          />
        </div>
        <div className="col-sm-4">
          <InputCheckbox
            label="Conforme"
            name="site_conform"
            labelTop={true}
            checked={values.site_conform === true}
            onChange={handleChange}
          />
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
            error={getErrorMessage('site_address1')}
          />
          <div className="row">
            <div className="col-sm-8">
              <InputText
                label="CP"
                name="site_cp"
                value={values.site_cp}
                onChange={handleChange}
                labtop={true}
                error={getErrorMessage('site_cp')}
              />
            </div>
            <div className="col-sm-28">
              <InputText
                label="Commune"
                name="site_town"
                value={values.site_town}
                onChange={handleChange}
                labtop={true}
                error={getErrorMessage('site_town')}
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
                error={getErrorMessage('site_area')}
              />
            </div>
            <div className="col-sm-28">
              <InputText
                label="Parcelles"
                name="site_plots"
                value={values.site_plots}
                onChange={handleChange}
                error={getErrorMessage('site_plots')}
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
                error={getErrorMessage('owner')}
              />
            </div>
          </div>
        </div>
      )}
      {values.currentTab === '2' && (
        <div>
          <div className="row">
            <div className="col-sm-36">
              <InputTextarea
                label="Complément de conformité"
                name="site_conform_text"
                value={values.site_conform_text}
                onChange={handleChange}
                error={getErrorMessage('site_conform_text')}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-36">
              <ClientInputPicker
                label="Vétérinaire"
                key="sanitary"
                name="sanitary"
                item={values.sanitary || null}
                onChange={handleChange}
                error={getErrorMessage('sanitary')}
              />
            </div>
          </div>
        </div>
      )}
      {values.currentTab === '3' && (
        <div className="row">
          <div className="col-sm-36">
            <InputTextarea
              label="Observations"
              name="site_desc"
              value={values.site_desc}
              onChange={handleChange}
              error={getErrorMessage('site_desc')}
            />
          </div>
        </div>
      )}
      {values.currentTab === '4' && (
        <div className="row">
          {props.properties.map(oneProp => {
            let nameProp = 'site_' + oneProp;
            return (
              <div className="col-sm-12" key={nameProp}>
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
    </ResponsiveModalOrForm>
  );
}

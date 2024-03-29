import React from 'react';
import { injectIntl } from 'react-intl';
import {
  InputHidden,
  InputText,
  InputSelect,
  InputMask,
  InputCheckbox,
} from 'react-bootstrap-front';
import RegexpParser from 'reregexp';
import classnames from 'classnames';
import { validateRegex } from '../../common';
import { Location as LocationIcon, Settings as SettingsIcon, Other as OtherIcon } from '../icons';
import { ResponsiveModalOrForm, InputTextarea, InputDate, InputData } from '../ui';
import useForm from '../ui/useForm';
import { siteTypeAsOptions } from '../site-type/functions.js';
import { InputPicker as ClientInputPicker, InlineClients } from '../client';
import { InputPicker as SiteInputPicker, InlinePhotos, InlineDocuments } from '../site';
import { InlineCauses } from '../cause';
import { InlineAlerts } from '../alert';

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
  { key: '3', name: 'equipement', label: 'Equipement', shortcut: 'E', icon: <SettingsIcon /> },
  {
    key: '4',
    name: 'observation',
    label: 'Observations',
    shortcut: 'O',
    icon: <OtherIcon />,
  },
];
const modifyTabs = [
  { key: '5', name: 'causes', label: 'Animaux', shortcut: 'E', icon: <SettingsIcon /> },
  { key: '6', name: 'alerts', label: 'Suivi', shortcut: 'S', icon: <SettingsIcon /> },
  { key: '7', name: 'documents', label: 'Documents', shortcut: 'D', icon: <SettingsIcon /> },
  { key: '8', name: 'photos', label: 'Photos', shortcut: 'I', icon: <SettingsIcon /> },
];

const afterChange = (name, item) => {
  switch (name) {
    case 'parent_site': {
      if (item.parent_site) {
        if (item.parent_site.site_code) {
          item.site_code = item.parent_site.site_code;
        }
      }
      break;
    }
    default: {
      break;
    }
  }
};

function Form(props) {
  const {
    values,
    handleChange,
    handleSubmit,
    handleCancel,
    handleNavTab,
    getErrorMessage,
  } = useForm(
    props.item,
    props.tab,
    props.onSubmit,
    props.onCancel,
    props.onNavTab,
    props.errors,
    props.intl,
    afterChange,
  );
  const regexp = (values.site_type ? values.site_type.sitt_pattern : '') || '';
  let validated = true;
  if (regexp !== '') {
    validated = false;
    if (regPlaceholder === '' || sitt_id !== values.site_type.id) {
      const parser = new RegexpParser('/' + regexp + '/', {
        namedGroupConf: {
          pays: ['FR'],
        },
      });
      regPlaceholder = parser.build();
    }
    if (values.site_code !== '' && validateRegex(values.site_code, regexp)) {
      validated = true;
    }
    sitt_id = values.site_type.id;
  }
  console.log('FK', values);
  return (
    <ResponsiveModalOrForm
      className=""
      title="Sites"
      tab={values.__currentTab}
      tabs={props.modify ? tabs.concat(modifyTabs) : tabs}
      size="lg"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onNavTab={handleNavTab}
      onClose={props.onClose}
      modal={props.modal || false}
    >
      <InputHidden name="id" id="id" value={values.id} />
      <div className="row">
        <div className="col-sm-w12">
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
        <div className="col-sm-w9">
          <InputMask
            mask={
              values.site_type && values.site_type.sitt_mask ? values.site_type.sitt_mask : '[*]'
            }
            label="N° Elevage EDE"
            name="site_code"
            value={values.site_code}
            onChange={handleChange}
            required={true}
            error={getErrorMessage('site_code')}
            help={validated ? false : 'Format : ' + regPlaceholder}
          />
        </div>
        <div className="col-xs-w15">
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
      </div>
      <hr />
      {values.__currentTab === '1' && (
        <div>
          <div className="row">
            <div className="col-sm-w24">
              <InputText
                label="Adresse"
                name="site_address1"
                value={values.site_address1}
                onChange={handleChange}
                labtop={true}
                error={getErrorMessage('site_address1')}
              />
            </div>
            <div className="col-sm-w8">
              <InputSelect
                label="Type"
                id="site_type"
                name="site_type"
                datas={{ type: 'FreeAsso_SiteType' }}
                required={true}
                value={values.site_type ? values.site_type.id : null}
                onChange={handleChange}
                options={siteTypeAsOptions(props.site_types)}
                error={getErrorMessage('site_type')}
              />
            </div>
            <div className="col-sm-w4">
              <InputCheckbox
                label="Externe"
                name="site_extern"
                labelTop={true}
                checked={values.site_extern === true}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-w6">
              <InputText
                label="CP"
                name="site_cp"
                value={values.site_cp}
                onChange={handleChange}
                labtop={true}
                error={getErrorMessage('site_cp')}
              />
            </div>
            <div className="col-sm-w18">
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
            <div className="col-sm-w6">
              <InputText
                label="Surface"
                name="site_area"
                value={values.site_area}
                onChange={handleChange}
                error={getErrorMessage('site_area')}
              />
            </div>
            <div className="col-sm-w18">
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
            <div className="col-sm-w36">
              <ClientInputPicker
                label="Propriétaire"
                key="owner"
                name="owner"
                pickerUp={true}
                item={values.owner || null}
                onChange={handleChange}
                error={getErrorMessage('owner')}
                typeCodes={['PROPRIETAIRE']}
              />
            </div>
          </div>
        </div>
      )}
      {values.__currentTab === '2' && (
        <div>
          <div className="row">
            <div className="col-sm-w18">
              <InputDate
                label="Début"
                name="site_from"
                id="site_from"
                value={values.site_from}
                onChange={handleChange}
                error={getErrorMessage('site_from')}
                position="top-start"
              />
            </div>
            <div className="col-sm-w18">
              <InputDate
                label="Fin"
                name="site_to"
                id="site_to"
                value={values.site_to}
                onChange={handleChange}
                error={getErrorMessage('site_to')}
                position="top-start"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-w36">
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
            <div className="col-sm-w36">
              <ClientInputPicker
                label="Vétérinaire / Clinique"
                key="sanitary"
                name="sanitary"
                pickerUp={true}
                item={values.sanitary || null}
                onChange={handleChange}
                error={getErrorMessage('sanitary')}
                typeCodes={['VETERINAIRE', 'CLINIQUE']}
              />
            </div>
          </div>
          {values.sanitary &&
            values.sanitary.id > 0 &&
            values.sanitary.client_type &&
            values.sanitary.client_type.id > 0 &&
            values.sanitary.client_type.clit_code === "CLINIQUE" && (
              <div className="row">
                <div className="col-sm-w36">
                  <div className="border border-secondary rounded overflow-x-hidden">
                    <InlineClients parentId={values.sanitary.id} />
                  </div>
                </div>
              </div>
            )}
        </div>
      )}
      {values.__currentTab === '3' && (
        <div className="row">
          {props.properties.map(oneProp => {
            let nameProp = 'site_' + oneProp;
            let className = 'col-sm-w10';
            if (oneProp.indexOf('bool') >= 0) {
              className = 'col-sm-w4';
            }
            return (
              <div className={classnames(className)} key={nameProp}>
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
      {values.__currentTab === '4' && (
        <div className="row">
          <div className="col-sm-w36">
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
      {values.__currentTab === '5' && (
        <div className="border border-secondary rounded overflow-x-hidden">
          <InlineCauses mode="site" siteId={values.id} />
        </div>
      )}
      {values.__currentTab === '6' && (
        <div className="border border-secondary rounded overflow-x-hidden">
          <InlineAlerts objId={values.id} objName="FreeAsso_Site" object={values} />
        </div>
      )}
      {values.__currentTab === '7' && (
        <div className="border border-secondary rounded overflow-x-hidden">
          <InlineDocuments siteId={values.id} />
        </div>
      )}
      {values.__currentTab === '8' && (
        <div className="border border-secondary rounded overflow-x-hidden">
          <InlinePhotos siteId={values.id} />
        </div>
      )}
    </ResponsiveModalOrForm>
  );
}

export default injectIntl(Form);

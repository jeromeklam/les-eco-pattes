import React from 'react';
import { injectIntl } from 'react-intl';
import { normalizedObjectModeler } from 'jsonapi-front';
import { InputHidden, InputText, InputSelect, InputCheckbox } from 'react-bootstrap-front';
import useForm from '../ui/useForm';
import { clientTypeAsOptions } from '../client-type/functions.js';
import { clientCategoryAsOptions } from '../client-category/functions.js';
import { countryAsOptions } from '../country/functions.js';
import { ResponsiveModalOrForm, InputTextarea } from '../ui';
import {
  InputPicker as ClientInputPicker,
  InlineClients,
  findTypeCode,
  findCategoryCode,
} from './';

const afterChange = (name, item) => {
  switch (name) {
    case 'client_type.id': {
      item._veto = false;
      if (item.client_type.id) {
        if (findTypeCode(item.client_type.id, item._types) === 'VETERINAIRE') {
          item._veto = true;
        } else {
          item.cli_sanit = false;
          item.parent_client = null;
        }
      }
      break;
    }
    case 'client_category.id': {
      item._private = false;
      if (item.client_category) {
        if (findCategoryCode(item.client_category.id, item._categories) === 'PARTICULIER') {
          item._private = true;
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
  props.item._types = normalizedObjectModeler(props.client_types, 'FreeAsso_ClientType');
  props.item._veto = false;
  props.item._clinique = false;
  if (props.item.client_type) {
    if (findTypeCode(props.item.client_type.id, props.item._types) === 'VETERINAIRE') {
      props.item._veto = true;
    } else if (findTypeCode(props.item.client_type.id, props.item._types) === 'CLINIQUE') {
      props.item._clinique = true;
    }
  }
  props.item._categories = normalizedObjectModeler(
    props.client_categories,
    'FreeAsso_ClientCategory',
  );
  props.item._private = false;
  if (props.item.client_category) {
    if (findCategoryCode(props.item.client_category.id, props.item._categories) === 'PARTICULIER') {
      props.item._private = true;
    }
  }
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
  let parent = '';
  if (values.cli_sanit || values._private) {
    if (values.cli_sanit) {
      parent = 'Clinique de rattachement';
    } else {
      parent = 'Famille';
    }
  }
  const tabsPlus = [
    { key: '3', name: 'children', label: 'Vétérinaires', shortcut: 'S', icon: 'misc' },
  ];
  return (
    <ResponsiveModalOrForm
      title="Contact"
      tab={values.currentTab}
      tabs={values._clinique ? props.tabs.concat(tabsPlus) : props.tabs}
      size="lg"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onNavTab={handleNavTab}
      onClose={props.onClose}
      modal={props.modal || false}
    >
      <div className="card-body">
        <InputHidden name="id" id="id" value={values.id} />
        <div className="row">
          <div className="col-sm-w5">
            <InputSelect
              label="Civilité"
              name="cli_gender"
              id="cli_gender"
              value={values.cli_gender}
              required={false}
              onChange={handleChange}
              options={[
                { label: '', value: 'OTHER' },
                { label: 'M.', value: 'MISTER' },
                { label: 'Mme', value: 'MADAM' },
              ]}
            />
          </div>
          <div className="col-sm-w9">
            <InputText
              label="Nom"
              name="cli_lastname"
              id="cli_lastname"
              required={true}
              value={values.cli_lastname}
              onChange={handleChange}
              error={getErrorMessage('cli_lastname')}
            />
          </div>
          <div className="col-sm-w9">
            <InputText
              label="Prénom"
              name="cli_firstname"
              id="cli_firstname"
              value={values.cli_firstname}
              onChange={handleChange}
              error={getErrorMessage('cli_firstname')}
            />
          </div>
          <div className="col-md-w7">
            <InputSelect
              label="Type"
              name="client_type.id"
              value={values.client_type ? values.client_type.id : null}
              onChange={handleChange}
              options={clientTypeAsOptions(props.client_types)}
              error={getErrorMessage('client_type')}
            />
          </div>
          <div className="col-md-w2">
            {values._veto && (
              <InputCheckbox
                label="Sanitaire"
                name="cli_sanit"
                labelTop={true}
                checked={values.cli_sanit === true}
                onChange={handleChange}
              />
            )}
          </div>
          <div className="col-sm-w1"></div>
          <div className="col-sm-w3">
            <InputCheckbox
              label="Actif"
              name="cli_actif"
              labelTop={true}
              checked={values.cli_actif === true}
              onChange={handleChange}
            />
          </div>
        </div>
        <hr />
        {values.currentTab === '1' && (
          <div>
            <div className="row">
              <div className="col-sm-w8">
                <InputText
                  label="Portable"
                  name="cli_phone_gsm"
                  labelTop={true}
                  value={values.cli_phone_gsm}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-w15">
                <InputText
                  label="Email"
                  name="cli_email"
                  labelTop={true}
                  value={values.cli_email}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-w9">
                <InputSelect
                  label="Catégorie"
                  name="client_category.id"
                  value={values.client_category ? values.client_category.id : null}
                  onChange={handleChange}
                  options={clientCategoryAsOptions(props.client_categories)}
                  error={getErrorMessage('client_category')}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-w36">
                <InputText
                  label="Adresse"
                  name="cli_address1"
                  value={values.cli_address1}
                  onChange={handleChange}
                  error={getErrorMessage('cli_address1')}
                />
              </div>
              <div className="col-md-w36">
                <InputText
                  label=""
                  name="cli_address2"
                  value={values.cli_address2}
                  onChange={handleChange}
                  error={getErrorMessage('cli_address2')}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-w8">
                <InputText
                  label="CP"
                  name="cli_cp"
                  value={values.cli_cp}
                  onChange={handleChange}
                  error={getErrorMessage('cli_cp')}
                />
              </div>
              <div className="col-sm-w17">
                <InputText
                  label="Commune"
                  name="cli_town"
                  value={values.cli_town}
                  onChange={handleChange}
                  error={getErrorMessage('cli_town')}
                />
              </div>
              <div className="col-sm-w11">
                <InputSelect
                  label="Pays"
                  name="country.id"
                  labelTop={true}
                  value={values.country ? values.country.id : null}
                  onChange={handleChange}
                  options={countryAsOptions(props.countries)}
                />
              </div>
            </div>
            <div>
              {parent !== '' && (
                <div>
                  <hr />
                  <div className="row">
                    <div className="col-md-w16">
                      <ClientInputPicker
                        label={parent}
                        key="parent_client"
                        name="parent_client"
                        item={values.parent_client || null}
                        onChange={handleChange}
                        error={getErrorMessage('parent_client')}
                        typeCodes={[parent.toUpperCase()]}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {values.currentTab === '2' && (
          <div>
            <div className="row">
              <div className="col-md-w8">
                <InputText
                  label="Téléphone"
                  name="cli_phone_home"
                  value={values.cli_phone_home}
                  onChange={handleChange}
                  error={getErrorMessage('cli_phone_home')}
                />
              </div>
              <div className="col-sm-w15">
                <InputText
                  label="Email 2"
                  name="cli_email_2"
                  labelTop={true}
                  value={values.cli_email_2}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-w18">
                <InputText
                  label="SIRET"
                  name="cli_siret"
                  labelTop={true}
                  value={values.cli_siret}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-w18">
                <InputText
                  label="SIREN"
                  name="cli_siren"
                  labelTop={true}
                  value={values.cli_siren}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-w36">
                <InputTextarea
                  label="Commentaires"
                  name="cli_desc"
                  value={values.cli_desc}
                  onChange={handleChange}
                  error={getErrorMessage('cli_desc')}
                />
              </div>
            </div>
          </div>
        )}
        {values.currentTab === '3' && (
          <div className="border border-secondary rounded overflow-x-hidden">
            <InlineClients parentId={values.id} />
          </div>
        )}
      </div>
    </ResponsiveModalOrForm>
  );
}

export default injectIntl(Form);

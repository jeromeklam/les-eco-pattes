import React from 'react';
import {
  InputHidden,
  InputText,
  InputSelect,
  InputCheckbox,
} from 'freeassofront';
import useForm from '../ui/useForm';
import { clientTypeAsOptions } from '../client-type/functions.js';
import { clientCategoryAsOptions } from '../client-category/functions.js';
import { countryAsOptions } from '../country/functions.js';
import { ResponsiveModalOrForm, InputTextarea } from '../ui';

export default function Form(props) {
  const {
    values,
    handleChange,
    handleSubmit,
    handleCancel,
    handleNavTab,
    getErrorMessage,
  } = useForm(props.item, props.tab, props.onSubmit, props.onCancel, props.onNavTab, props.errors);
  return (
    <ResponsiveModalOrForm
      title="Personne"
      tab={values.currentTab}
      tabs={props.tabs}
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
          <div className="col-sm-5">
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
          <div className="col-sm-9">
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
          <div className="col-sm-9">
            <InputText
              label="Prénom"
              name="cli_firstname"
              id="cli_firstname"
              value={values.cli_firstname}
              onChange={handleChange}
              error={getErrorMessage('cli_firstname')}
            />
          </div>
          <div className="col-md-9">
            <InputSelect
              label="Type"
              name="client_type.id"
              value={values.client_type ? values.client_type.id : null}
              onChange={handleChange}
              options={clientTypeAsOptions(props.client_types)}
              error={getErrorMessage('client_type')}
            />
          </div>
          <div className="col-sm-1"></div>
          <div className="col-sm-3">
            <InputCheckbox
              label="Actif"
              name="cli_active"
              labelTop={true}
              checked={values.cli_active === true}
              onChange={handleChange}
            />
          </div>
        </div>
        <hr />
        {values.currentTab === '1' && (
          <div>
            <div className="row">
              <div className="col-sm-8">
                <InputText
                  label="Portable"
                  name="cli_phone_gsm"
                  labelTop={true}
                  value={values.cli_phone_gsm}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-15">
                <InputText
                  label="Email"
                  name="cli_email"
                  labelTop={true}
                  value={values.cli_email}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-9">
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
              <div className="col-md-36">
                <InputText
                  label="Adresse"
                  name="cli_address1"
                  value={values.cli_address1}
                  onChange={handleChange}
                  error={getErrorMessage('cli_address1')}
                />
              </div>
              <div className="col-md-36">
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
              <div className="col-sm-8">
                <InputText
                  label="CP"
                  name="cli_cp"
                  value={values.cli_cp}
                  onChange={handleChange}
                  error={getErrorMessage('cli_cp')}
                />
              </div>
              <div className="col-sm-17">
                <InputText
                  label="Commune"
                  name="cli_town"
                  value={values.cli_town}
                  onChange={handleChange}
                  error={getErrorMessage('cli_town')}
                />
              </div>
              <div className="col-sm-11">
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
          </div>
        )}
        {values.currentTab === '2' && (
          <div>
            <div className="row">
              <div className="col-md-8">
                <InputText
                  label="Téléphone"
                  name="cli_phone_home"
                  value={values.cli_phone_home}
                  onChange={handleChange}
                  error={getErrorMessage('cli_phone_home')}
                />
              </div>
              <div className="col-sm-15">
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
              <div className="col-md-18">
                <InputText
                  label="SIRET"
                  name="cli_siret"
                  labelTop={true}
                  value={values.cli_siret}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-18">
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
              <div className="col-md-36">
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
      </div>
    </ResponsiveModalOrForm>
  );
}

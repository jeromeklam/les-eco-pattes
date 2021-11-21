import React from 'react';
import { injectIntl } from 'react-intl';
import { normalizedObjectModeler } from 'jsonapi-front';
import { InputHidden, InputText, InputSelect, InputCheckbox } from 'react-bootstrap-front';
import useForm from '../ui/useForm';
import { clientTypeAsOptions } from '../client-type/functions.js';
import { clientCategoryAsOptions } from '../client-category/functions.js';
import { countryAsOptions } from '../country/functions.js';
import { ResponsiveModalOrForm, InputTextarea, InputEmail, InputPhone, Row, Col } from '../ui';
import {
  InputPicker as ClientInputPicker,
  InlineClients,
  findTypeCode,
  findCategoryCode,
} from './';

const afterChange = (name, item) => {
  switch (name) {
    case 'client_type.id': {
      item.__veto = false;
      if (item.client_type.id) {
        if (findTypeCode(item.client_type.id, item.__types) === 'VETERINAIRE') {
          item.__veto = true;
        } else {
          item.cli_sanit = false;
          item.parent_client = null;
        }
      }
      break;
    }
    case 'client_category.id': {
      item.__private = false;
      if (item.client_category) {
        if (findCategoryCode(item.client_category.id, item.__categories) === 'PARTICULIER') {
          item.__private = true;
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
  props.item.__types = normalizedObjectModeler(props.client_types, 'FreeAsso_ClientType');
  props.item.__veto = false;
  props.item.__clinique = false;
  if (props.item.client_type) {
    if (findTypeCode(props.item.client_type.id, props.item.__types) === 'VETERINAIRE') {
      props.item.__veto = true;
    } else if (findTypeCode(props.item.client_type.id, props.item.__types) === 'CLINIQUE') {
      props.item.__clinique = true;
    }
  }
  props.item.__categories = normalizedObjectModeler(
    props.client_categories,
    'FreeAsso_ClientCategory',
  );
  props.item.__private = false;
  if (props.item.client_category) {
    if (
      findCategoryCode(props.item.client_category.id, props.item.__categories) === 'PARTICULIER'
    ) {
      props.item.__private = true;
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
  if (values.cli_sanit || values.__private) {
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
      tab={values.__currentTab}
      tabs={values.__clinique ? props.tabs.concat(tabsPlus) : props.tabs}
      size="lg"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onNavTab={handleNavTab}
      onClose={props.onClose}
      modal={props.modal || false}
      saving={props.saving || false}
    >
      <div className="card-body">
        <InputHidden name="id" id="id" value={values.id} />
        <Row>
          <Col size={{xxs: 36, sm: 5}}>
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
          </Col>
          <Col size={{xxs: 36, sm: 8}}>
            <InputText
              label="Nom"
              name="cli_lastname"
              id="cli_lastname"
              required={true}
              value={values.cli_lastname}
              onChange={handleChange}
              error={getErrorMessage('cli_lastname')}
            />
          </Col>
          <Col size={{xxs: 36, sm: 8}}>
            <InputText
              label="Prénom"
              name="cli_firstname"
              id="cli_firstname"
              value={values.cli_firstname}
              onChange={handleChange}
              error={getErrorMessage('cli_firstname')}
            />
          </Col>
          <Col size={{xxs: 36, sm: 7}}>
            <InputSelect
              label="Type"
              name="client_type.id"
              value={values.client_type ? values.client_type.id : null}
              onChange={handleChange}
              options={clientTypeAsOptions(props.client_types)}
              error={getErrorMessage('client_type')}
            />
          </Col>
          <Col size={{xxs: 36, sm: 3}}>
            {values.__veto && (
              <InputCheckbox
                label="Sanitaire"
                name="cli_sanit"
                labelTop={true}
                checked={values.cli_sanit === true}
                onChange={handleChange}
              />
            )}
          </Col>
          <Col size={{xxs: 36, sm: 3}}>
            <InputCheckbox
              label="Actif"
              name="cli_active"
              labelTop={true}
              checked={values.cli_active === true}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <hr />
        {values.__currentTab === '1' && (
          <div>
            <Row>
              <Col size={{xxs: 36, sm: 8}}>
                <InputPhone
                  label="Portable"
                  name="cli_phone_gsm"
                  labelTop={true}
                  value={values.cli_phone_gsm}
                  onChange={handleChange}
                />
              </Col>
              <Col size={{xxs: 36, sm: 15}}>
                <InputEmail
                  label="Email"
                  name="cli_email"
                  labelTop={true}
                  value={values.cli_email}
                  onChange={handleChange}
                />
              </Col>
              <Col size={{xxs: 36, sm: 9}}>
                <InputSelect
                  label="Catégorie"
                  name="client_category.id"
                  value={values.client_category ? values.client_category.id : null}
                  onChange={handleChange}
                  options={clientCategoryAsOptions(props.client_categories)}
                  error={getErrorMessage('client_category')}
                />
              </Col>
              <Col size={{xxs: 36, sm: 36}}>
                <InputText
                  label="Raison sociale"
                  name="cli_social_reason"
                  value={values.cli_social_reason}
                  onChange={handleChange}
                  error={getErrorMessage('cli_social_reason')}
                />
              </Col>
              <Col size={{xxs: 36, sm: 36}}>
                <InputText
                  label="Adresse"
                  name="cli_address1"
                  value={values.cli_address1}
                  onChange={handleChange}
                  error={getErrorMessage('cli_address1')}
                />
              </Col>
              <Col size={{xxs: 36, sm: 36}}>
                <InputText
                  label=""
                  name="cli_address2"
                  value={values.cli_address2}
                  onChange={handleChange}
                  error={getErrorMessage('cli_address2')}
                />
              </Col>
              <Col size={{xxs: 36, sm: 8}}>
                <InputText
                  label="CP"
                  name="cli_cp"
                  value={values.cli_cp}
                  onChange={handleChange}
                  error={getErrorMessage('cli_cp')}
                />
              </Col>
              <Col size={{xxs: 36, sm: 17}}>
                <InputText
                  label="Commune"
                  name="cli_town"
                  value={values.cli_town}
                  onChange={handleChange}
                  error={getErrorMessage('cli_town')}
                />
              </Col>
              <Col size={{xxs: 36, sm: 11}}>
                <InputSelect
                  label="Pays"
                  name="country.id"
                  labelTop={true}
                  value={values.country ? values.country.id : null}
                  onChange={handleChange}
                  options={countryAsOptions(props.countries)}
                />
              </Col>
            </Row>
            <div>
              {parent !== '' && (
                <div>
                  <hr />
                  <Row>
                  <Col size={{xxs: 36, sm: 16}}>
                      <ClientInputPicker
                        label={parent}
                        key="parent_client"
                        name="parent_client"
                        item={values.parent_client || null}
                        onChange={handleChange}
                        error={getErrorMessage('parent_client')}
                        typeCodes={[parent.toUpperCase()]}
                      />
                    </Col>
                  </Row>
                </div>
              )}
            </div>
          </div>
        )}
        {values.__currentTab === '2' && (
          <Row>
            <Col size={{xxs: 36, sm: 8}}>
              <InputPhone
                label="Téléphone"
                name="cli_phone_home"
                value={values.cli_phone_home}
                onChange={handleChange}
                error={getErrorMessage('cli_phone_home')}
              />
            </Col>
            <Col size={{xxs: 36, sm: 15}}>
              <InputEmail
                label="Email 2"
                name="cli_email_2"
                labelTop={true}
                value={values.cli_email_2}
                onChange={handleChange}
              />
            </Col>
            <Col size={{xxs: 36, sm: 18}}>
              <InputText
                label="SIRET"
                name="cli_siret"
                labelTop={true}
                value={values.cli_siret}
                onChange={handleChange}
              />
            </Col>
            <Col size={{xxs: 36, sm: 36}}>
              <InputTextarea
                label="Commentaires"
                name="cli_desc"
                value={values.cli_desc}
                onChange={handleChange}
                error={getErrorMessage('cli_desc')}
              />
            </Col>
          </Row>
        )}
        {values.__currentTab === '3' && (
          <div className="border border-secondary rounded overflow-x-hidden">
            <InlineClients parentId={values.id} />
          </div>
        )}
      </div>
    </ResponsiveModalOrForm>
  );
}

export default injectIntl(Form);

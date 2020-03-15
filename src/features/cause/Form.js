import React from 'react';
import { InputHidden, InputText, InputSelect } from 'freeassofront';
import RegexpParser from 'reregexp';
import { InputDate, InputData } from '../ui';
import useForm from '../ui/useForm';
import { causeTypeAsOptions } from '../cause-type/functions.js';
import { InputPicker as ClientInputPicker } from '../client';
import { InputPicker as SiteInputPicker } from '../site';
import { InputPicker as CauseInputPicker, sexSelect } from './';
import { validateRegex } from '../../common';
import { ResponsiveModalOrForm, InputYear, InputTextarea } from '../ui';

let regPlaceholder = '';
let caut_id = 0;

export default function Form(props) {
  const {
    values,
    handleChange,
    handleSubmit,
    handleCancel,
    handleNavTab,
    getErrorMessage,
  } = useForm(props.item, props.tab, props.onSubmit, props.onCancel, props.onNavTab, props.errors);
  const regexp = values.cause_type.caut_pattern || '';
  let validated = true;
  if (regexp !== '') {
    validated = false;
    if (regPlaceholder === '' || caut_id !== values.cause_type.id) {
      const parser = new RegexpParser('/' + regexp + '/',{namedGroupConf:{
        pays: ['FR'],
        cpays: ['250']
      }});
      regPlaceholder = parser.build();
    }
    if (values.cau_code !== '' && validateRegex(values.cau_code, regexp)) {
      validated = true;
    }
    caut_id = values.cause_type.id;
  }
  return (
    <ResponsiveModalOrForm
      title="Animaux"
      tab={values.currentTab}
      tabs={props.tabs}
      size="xl"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onNavTab={handleNavTab}
      itemPrev={props.prev}
      itemNext={props.next}
      onClose={props.onClose}
      modal={props.modal || false}
    >
      <InputHidden name="id" id="id" value={values.id} />
      <div className="row">
        <div className="col-8">
          <InputText
            label="N° boucle"
            name="cau_code"
            id="cau_code"
            value={values.cau_code}
            onChange={handleChange}
            labelTop={true}
            pattern={regexp}
            required={true}
            error={getErrorMessage('cau_code')}
            warning={validated ? false : 'Format : ' + regPlaceholder}
          />
        </div>
        <div className="col-10">
          <InputSelect
            label="Race"
            name="cause_type.id"
            value={values.cause_type ? values.cause_type.id : null}
            addempty={true}
            onChange={handleChange}
            options={causeTypeAsOptions(props.cause_types)}
            labelTop={true}
            required={true}
            error={getErrorMessage('cause_type')}
          />
        </div>
        <div className="col-18">
          <SiteInputPicker
            label="Site"
            key="site"
            name="site"
            item={values.site || null}
            onChange={handleChange}
            labelTop={true}
            required={true}
            error={getErrorMessage('site')}
          />
        </div>
      </div>
      <hr />
      {values.currentTab === '1' && (
        <div>
          <div className="row">
            <div className="col-18">
              <InputText
                label="Nom"
                key="cau_name"
                name="cau_name"
                value={values.cau_name}
                onChange={handleChange}
                labelTop={true}
                error={getErrorMessage('cau_name')}
              />
            </div>
            <div className="col-18">
              <InputSelect
                label="M/F"
                name="cau_sex"
                id="cau_sex"
                value={values.cau_sex}
                onChange={handleChange}
                options={sexSelect}
                labelTop={true}
                error={getErrorMessage('cau_sex')}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <InputYear
                label="Année de naissance"
                name="cau_year"
                id="cau_year"
                value={values.cau_year}
                onChange={handleChange}
                labelTop={true}
                error={getErrorMessage('cau_year')}
              />
            </div>
            <div className="col-6">
              <InputData
                name="cau_string_1"
                value={values.cau_string_1}
                datas={props.tab_datas}
                config={props.tab_configs}
                onChange={handleChange}
                labelTop={true}
              />
            </div>
            <div className="col-12">
              <CauseInputPicker
                label="Père"
                name="parent1"
                item={values.parent1 || null}
                onChange={handleChange}
                labelTop={true}
                error={getErrorMessage('parent1')}
                filters={{cau_sex: 'M'}}
              />
            </div>
            <div className="col-12">
              <CauseInputPicker
                label="Mère"
                name="parent2"
                item={values.parent2 || null}
                onChange={handleChange}
                labelTop={true}
                error={getErrorMessage('parent2')}
                filters={{cau_sex: 'F'}}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-10">
              <InputDate
                label="Entrée"
                name="cau_from"
                id="cau_from"
                value={values.cau_from}
                onChange={handleChange}
                error={getErrorMessage('cau_from')}
                position="top-start"
              />
            </div>
            <div className="col-10">
              <InputDate
                label="Sortie"
                name="cau_to"
                id="cau_to"
                value={values.cau_to}
                onChange={handleChange}
                labelTop={true}
                position="top-start"
              />
            </div>
            <div className="col-16">
              <ClientInputPicker
                label="Eleveur"
                key="raiser"
                name="raiser"
                item={values.raiser || null}
                onChange={handleChange}
                error={getErrorMessage('raiser')}
              />
            </div>
          </div>
        </div>
      )}
      {values.currentTab === '2' && (
        <div>
          <ClientInputPicker
            label="Provenance"
            key="origin"
            name="origin"
            item={values.origin || null}
            onChange={handleChange}
            error={getErrorMessage('origin')}
          />
          <InputTextarea
            label="Observations"
            name="cau_desc"
            value={values.cau_desc}
            onChange={handleChange}
            labelTop={true}
            error={getErrorMessage('cau_desc')}
          />
        </div>
      )}
    </ResponsiveModalOrForm>
  );
}

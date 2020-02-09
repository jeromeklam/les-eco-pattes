import React from 'react';
import { InputHidden, InputText, InputSelect, InputTextarea, ResponsiveForm } from 'freeassofront';
import { InputDate } from '../ui';
import useForm from '../ui/useForm';
import { causeTypeAsOptions } from '../cause-type/functions.js';
import { InputPicker as ClientInputPicker } from '../client';
import { InputPicker as SiteInputPicker } from '../site';
import { InputPicker as CauseInputPicker, sexSelect } from './';

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
  return (
    <ResponsiveForm
      title="Animaux"
      tab={values.currentTab}
      tabs={props.tabs}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onNavTab={handleNavTab}
      itemPrev={props.prev}
      itemNext={props.next}
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
            error={getErrorMessage('cau_code')}
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
              <InputText
                label="Année de naissance"
                name="cau_year"
                id="cau_year"
                value={values.cau_year}
                onChange={handleChange}
                labelTop={true}
                error={getErrorMessage('cau_year')}
              />
            </div>
            <div className="col-15">
              <CauseInputPicker
                label="Père"
                key="parent1"
                name="parent1"
                item={values.parent1 || null}
                onChange={handleChange}
                labelTop={true}
                error={getErrorMessage('parent1')}
                filters={{cau_sex: 'M'}}
              />
            </div>
            <div className="col-15">
              <CauseInputPicker
                label="Mère"
                key="parent2"
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
    </ResponsiveForm>
  );
}

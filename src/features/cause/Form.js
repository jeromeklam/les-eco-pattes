import React from 'react';
import { InputHidden, InputText, InputSelect, InputMask, InputCheckbox } from 'react-bootstrap-front';
import RegexpParser from 'reregexp';
import { validateRegex } from '../../common';
import { 
  ResponsiveModalOrForm, 
  InputTextarea,
  InputDate, 
  InputData, 
  InputSpin, 
} from '../ui';
import useForm from '../ui/useForm';
import { InputPicker as ClientInputPicker } from '../client';
import { InputPicker as SiteInputPicker } from '../site';
import { causeTypeAsOptions } from '../cause-type/functions.js';
import { InputPicker as CauseInputPicker, sexSelect } from './';
import { InlineDocuments, InlinePhotos, InlineCauses } from '../cause';
import { InlineGrowths } from '../cause-growth';
import { InlineMovements } from '../cause-movement';
import { InlineSicknesses } from '../cause-sickness';

let regPlaceholder = '';
let caut_id = 0;

const tabs = [
  { key: '1', name: 'identification', label: 'Identification', shortcut: 'A', icon: 'cause' },
  { key: '2', name: 'divers', label: 'Divers', shortcut: 'D', icon: 'misc' },
];
const modifyTabs = [
  { key: '3', name: 'movements', label: 'Mouvements', shortcut: 'E', icon: 'movements' },
  { key: '4', name: 'sicknesses', label: 'Santé', shortcut: 'E', icon: 'sicknesses' },
  { key: '5', name: 'croissance', label: 'Croissance', shortcut: 'E', icon: 'croissance' },
  { key: '6', name: 'descendant', label: 'Descendance', shortcut: 'E', icon: 'descendant' },
  { key: '7', name: 'documents', label: 'Documents', shortcut: 'E', icon: 'documents' },
  { key: '8', name: 'photos', label: 'Photos', shortcut: 'E', icon: 'photos' },
];

export default function Form(props) {
  const maxYear = new Date().getFullYear() + 1;
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
      const parser = new RegexpParser('/' + regexp + '/',
        {namedGroupConf:{
          pays: ['FR'],
          cpays: ['250']
        }
      });
      regPlaceholder = parser.build();
    }
    if (values.cau_code !== '' && validateRegex(values.cau_code, regexp)) {
      validated = true;
    }
    caut_id = values.cause_type.id;
  }
  return (  
    <ResponsiveModalOrForm
      title={values.cau_code}
      tab={values.currentTab}
      tabs={props.modify ? tabs.concat(modifyTabs) : tabs}
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
          <InputMask
            label="N° boucle"
            name="cau_code"
            id="cau_code"
            value={values.cau_code}
            onChange={handleChange}
            labelTop={true}
            required={true}
            mask={(values.cause_type && values.cause_type.caut_mask) ? values.cause_type.caut_mask : '[*]'}
            pattern={regexp}
            error={getErrorMessage('cau_code')}
            help={validated ? false : 'Format : ' + regPlaceholder}
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
            <div className="col-12">
              <InputText
                label="Nom"
                key="cau_name"
                name="cau_name"
                labelTop={true}
                value={values.cau_name}
                onChange={handleChange}
                error={getErrorMessage('cau_name')}
              />
            </div>
            <div className="col-8">
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
            <div className="col-16">
              <ClientInputPicker
                label="Eleveur"
                key="raiser"
                name="raiser"
                item={values.raiser || null}
                onChange={handleChange}
                error={getErrorMessage('raiser')}
                typeCodes={['ELEVEUR']}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <InputSpin
                label="Année de naissance"
                name="cau_year"
                id="cau_year"
                value={values.cau_year}
                maxValue={maxYear}
                minValue={1990}
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
            <div className="col-sm-2">
              <InputCheckbox
                label="Attente"
                name="cau_waiting"
                labelTop={true}
                checked={values.cau_waiting === true}
                onChange={handleChange}
              />
            </div>
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
            <div className="col-14">
              {(values.cau_to !== null && values.cau_to !== '') && (
                <InputData
                  name="cau_string_3"
                  labelTop={true}
                  value={values.cau_string_3}
                  datas={props.tab_datas}
                  config={props.tab_configs}
                  onChange={handleChange}
                />
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-2">
              <InputCheckbox
                label="Conforme"
                name="cau_conform"
                labelTop={true}
                checked={values.cau_conform === true}
                onChange={handleChange}
              />
            </div>
            <div className="col-20">
              {(!values.cau_conform) && (
                <InputText
                  label="Commentaire conformité"
                  key="cau_conform_text"
                  name="cau_conform_text"
                  labelTop={true}
                  value={values.cau_conform_text}
                  onChange={handleChange}
                  error={getErrorMessage('cau_conform_text')}
                />
              )}
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
            typeCodes={['PROVENANCE']}
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
      {values.currentTab === '3' && (
        <div className="border border-secondary rounded overflow-x-hidden">
          <InlineMovements cause={values} />
        </div>
      )}
      {values.currentTab === '4' && (
        <div className="border border-secondary rounded overflow-x-hidden">
          <InlineSicknesses cause={values} />
        </div>
      )}
      {values.currentTab === '5' && (
        <div className="border border-secondary rounded overflow-x-hidden">
          <InlineGrowths cause={values} />
        </div>
      )}
      {values.currentTab === '6' && (
        <div className="border border-secondary rounded overflow-x-hidden">
          <InlineCauses mode="cause" cause={values} />
        </div>
      )}
      {values.currentTab === '7' && (
        <div className="border border-secondary rounded overflow-x-hidden">
          <InlineDocuments cauId={values.id} />
        </div>
      )}
      {values.currentTab === '8' && (
        <div className="border border-secondary rounded overflow-x-hidden">
          <InlinePhotos cauId={values.id} />
        </div>
      )}
    </ResponsiveModalOrForm>
  );
}

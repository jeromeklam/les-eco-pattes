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
import { validateRegex } from '../../common';
import {
  ResponsiveModalOrForm,
  InputTextarea,
  InputDate,
  InputData,
  InputSpin,
  Row,
  Col,
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
import { findCauseType } from '../cause-type';

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

function Form(props) {
  const maxYear = new Date().getFullYear() + 1;
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
  );
  let mask = '';
  let regexp = '';
  let validated = true;
  const cause_type = findCauseType(props.cause_types, values.cause_type.id);
  if (cause_type) {
    regexp = cause_type.caut_pattern || '';
    if (regexp !== '') {
      validated = false;
      if (regPlaceholder === '' || caut_id !== values.cause_type.id) {
        const parser = new RegexpParser('/' + regexp + '/', {
          namedGroupConf: {
            pays: ['FR'],
            cpays: ['250'],
          },
        });
        regPlaceholder = parser.build();
      }
      if (values.cau_code !== '' && validateRegex(values.cau_code, regexp)) {
        validated = true;
      }
      caut_id = values.cause_type.id;
      mask = cause_type.caut_mask ? cause_type.caut_mask : '[*]';
    }
  }
  return (
    <ResponsiveModalOrForm
      title={values.cau_code}
      tab={values.__currentTab}
      tabs={values.__modify ? tabs.concat(modifyTabs) : tabs}
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
      <Row>
        <Col size={{ xxs: 36, sm: 8 }}>
          <InputMask
            label="N° boucle"
            name="cau_code"
            id="cau_code"
            value={values.cau_code}
            onChange={handleChange}
            labelTop={true}
            required={true}
            mask={mask}
            pattern={regexp}
            error={getErrorMessage('cau_code')}
            help={validated ? false : 'Format : ' + regPlaceholder}
          />
        </Col>
        <Col size={{ xxs: 36, sm: 10 }}>
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
        </Col>
        <Col size={{ xxs: 36, sm: 18 }}>
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
        </Col>
      </Row>
      <hr />
      {values.__currentTab === '1' && (
        <>
          <Row>
            <Col size={{ xxs: 36, sm: 12 }}>
              <InputText
                label="Nom"
                key="cau_name"
                name="cau_name"
                labelTop={true}
                value={values.cau_name}
                onChange={handleChange}
                error={getErrorMessage('cau_name')}
              />
            </Col>
            <Col size={{ xxs: 36, sm: 8 }}>
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
            </Col>
            <Col size={{ xxs: 36, sm: 16 }}>
              <ClientInputPicker
                label="Eleveur"
                key="raiser"
                name="raiser"
                item={values.raiser || null}
                onChange={handleChange}
                error={getErrorMessage('raiser')}
                typeCodes={['ELEVEUR']}
              />
            </Col>
          </Row>
          <Row>
            <Col size={{ xxs: 36, sm: 6 }}>
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
            </Col>
            <Col size={{ xxs: 36, sm: 6 }}>
              <InputData
                name="cau_string_1"
                value={values.cau_string_1}
                datas={props.tab_datas}
                config={props.tab_configs}
                onChange={handleChange}
                labelTop={true}
              />
            </Col>
            <Col size={{ xxs: 36, sm: 12 }}>
              <CauseInputPicker
                label="Père"
                name="parent1"
                item={values.parent1 || null}
                onChange={handleChange}
                labelTop={true}
                error={getErrorMessage('parent1')}
                filterSex={'M'}
              />
            </Col>
            <Col size={{ xxs: 36, sm: 12 }}>
              <CauseInputPicker
                label="Mère"
                name="parent2"
                item={values.parent2 || null}
                onChange={handleChange}
                labelTop={true}
                error={getErrorMessage('parent2')}
                filterSex={'F'}
              />
            </Col>
          </Row>
          <Row>
            <div className="col-sm-w3">
              <InputCheckbox
                label="Attente"
                name="cau_waiting"
                labelTop={true}
                checked={values.cau_waiting === true}
                onChange={handleChange}
              />
            </div>
            <div className="col-xs-w9">
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
            <div className="col-xs-w9">
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
            <div className="col-xs-w15">
              {values.cau_to !== null && values.cau_to !== '' && (
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
          </Row>
          <Row>
            <div className="col-sm-w3">
              <InputCheckbox
                label="Conforme"
                name="cau_conform"
                labelTop={true}
                checked={values.cau_conform === true}
                onChange={handleChange}
              />
            </div>
            <div className="col-xs-w18">
              {!values.cau_conform && (
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
          </Row>
        </>
      )}
      {values.__currentTab === '2' && (
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
      {values.__currentTab === '3' && (
        <div className="border border-secondary rounded overflow-x-hidden">
          <InlineMovements cause={values} />
        </div>
      )}
      {values.__currentTab === '4' && (
        <div className="border border-secondary rounded overflow-x-hidden">
          <InlineSicknesses cause={values} />
        </div>
      )}
      {values.__currentTab === '5' && (
        <div className="border border-secondary rounded overflow-x-hidden">
          <InlineGrowths cause={values} />
        </div>
      )}
      {values.__currentTab === '6' && (
        <div className="border border-secondary rounded overflow-x-hidden">
          <InlineCauses mode="cause" cause={values} />
        </div>
      )}
      {values.__currentTab === '7' && (
        <div className="border border-secondary rounded overflow-x-hidden">
          <InlineDocuments cauId={values.id} />
        </div>
      )}
      {values.__currentTab === '8' && (
        <div className="border border-secondary rounded overflow-x-hidden">
          <InlinePhotos cauId={values.id} />
        </div>
      )}
    </ResponsiveModalOrForm>
  );
}

export default injectIntl(Form);

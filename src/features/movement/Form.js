import React from 'react';
import { injectIntl } from 'react-intl';
import { isEmptyModel } from 'jsonapi-front';
import { InputHidden, InputText, InputSelect, InputCheckbox, FILTER_OPER_EQUAL } from 'react-bootstrap-front';
import { Movement as MovementIcon, Cause as CauseIcon } from '../icons';
import { useForm, ResponsiveModalOrForm, InputDatetime } from '../ui';
import { MultiInputPicker as CauseMultiInputPicker } from '../cause';
import { InputPicker as SiteInputPicker } from '../site';
import { InlineCauses } from '../cause-movement';
import { getTypeLabel, mvtStatus, mvtTypes, mvtFromType, mvtToType } from './';

const tabs = [
  {
    key: '1',
    name: 'movements',
    label: 'Mouvement',
    shortcut: 'C',
    icon: <MovementIcon />,
  },
];
const tabsFrom = [
  {
    key: '3',
    name: 'from',
    label: 'Départ',
    shortcut: 'D',
    icon: <MovementIcon />,
  },
];
const tabsTo = [
  {
    key: '4',
    name: 'to',
    label: 'Arrivée',
    shortcut: 'A',
    icon: <MovementIcon />,
  },
];
const tabsEnd = [
  {
    key: '9',
    name: 'causes',
    label: 'Animaux',
    shortcut: 'A',
    icon: <CauseIcon />,
  },
];

const initItem = item => {
  if (!item.__modify) {
    item.move_type = item.param_mode || 'SIMPLE';
    item.move_from = new Date().toISOString();
    item.move_to = new Date().toISOString();
    if (item.param_site) {
      if (item.param_mode === 'INPUT') {
        item.to_site = item.param_site;
        afterChange('to_site', item);
      } else {
        item.from_site = item.param_site;
        afterChange('from_site', item);
      }
    }
  }
  item.transportRequired = false;
  item.fromRequired = false;
  item.toRequired = false;
  item.globalDisabled = false;
  if (item.__modify && item.move_status === 'ARCHIVE') {
    item.globalDisabled = true;
  }
};

const afterChange = (name, item) => {
  try {
    switch (name) {
      case 'from_site':
        item.move_from_name = item.from_site.site_name;
        item.move_from_num = item.from_site.site_code;
        item.move_from_address = item.from_site.site_address1;
        item.move_from_town = item.from_site.site_town;
        item.move_from_cp = item.from_site.site_cp;
        break;
      case 'to_site':
        item.move_to_name = item.to_site.site_name;
        item.move_to_num = item.to_site.site_code;
        item.move_to_address = item.to_site.site_address1;
        item.move_to_town = item.to_site.site_town;
        item.move_to_cp = item.to_site.site_cp;
        break;
      default:
        break;
    }
  } catch (ex) {}
};

function Form(props) {
  props.item.param_mode = props.mode || 'SIMPLE';
  props.item.param_site = props.fromSite || null;
  const {
    values,
    handleChange,
    handleSubmit,
    handleCancel,
    getErrorMessage,
    handleNavTab,
  } = useForm(
    props.item,
    props.tab,
    props.onSubmit,
    props.onCancel,
    props.onNavTab,
    props.errors,
    props.intl,
    afterChange,
    initItem,
  );
  let myTabs = tabs;
  myTabs = tabs.concat(tabsFrom, tabsTo);
  if (!isEmptyModel(values.from_site)) {
    myTabs = myTabs.concat(tabsEnd);
  }
  let disableSiteFrom = values.globalDisabled;
  let disableSiteTo = values.globalDisabled;
  if (!values.globalDisabled  && values.__modify) {
    if (values.from_site) {
      disableSiteFrom = true;
    }
    if (values.to_site) {
      disableSiteTo = true;
    }
  }
  return (
    <ResponsiveModalOrForm
      className=""
      title={getTypeLabel(values.move_type)}
      tab={values.__currentTab}
      tabs={myTabs}
      size="lg"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onNavTab={handleNavTab}
      onClose={props.onClose}
      modal={props.modal || false}
      actionsButtons={props.actionsButtons}
    >
      <div className="card-body">
        <InputHidden name="id" id="id" value={values.id} />
        {values.__currentTab === '1' && (
          <div>
            <div className="row">
              <div className="col-sm-w12">
                <InputSelect
                  label="Type"
                  id="move_type"
                  name="move_type"
                  required={true}
                  value={values.move_type}
                  onChange={handleChange}
                  options={mvtTypes}
                  addempty={true}
                  disabled={values.globalDisabled}
                  error={getErrorMessage('move_type')}
                />
              </div>
              <div className="col-sm-w8">
                <InputSelect
                  label="Statut"
                  id="move_status"
                  name="move_status"
                  required={true}
                  value={values.move_status}
                  onChange={handleChange}
                  options={mvtStatus}
                  addempty={true}
                  disabled={values.globalDisabled}
                  defaultValue="WAIT"
                  error={getErrorMessage('move_status')}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-w12">
                <InputText
                  label="Nom transporteur"
                  name="move_tr_name"
                  id="move_tr_name"
                  required={values.transportRequired}
                  value={values.move_tr_name}
                  onChange={handleChange}
                  disabled={values.globalDisabled}
                  error={getErrorMessage('move_tr_name')}
                />
              </div>
              <div className="col-sm-w12">
                <InputText
                  label="N° transporteur"
                  name="move_tr_num"
                  id="move_tr_num"
                  required={values.transportRequired}
                  value={values.move_tr_num}
                  onChange={handleChange}
                  disabled={values.globalDisabled}
                  error={getErrorMessage('move_tr_num')}
                />
              </div>
              <div className="col-sm-w12">
                <InputText
                  label="N° véhicule"
                  name="move_tr_num2"
                  id="move_tr_num2"
                  required={values.transportRequired}
                  value={values.move_tr_num2}
                  onChange={handleChange}
                  disabled={values.globalDisabled}
                  error={getErrorMessage('move_tr_num2')}
                />
              </div>
            </div>
          </div>
        )}
        {values.__currentTab === '3' && (
          <div>
            <div className="row">
              <div className="col-sm-w12">
                <SiteInputPicker
                  label="Site de départ"
                  key="from_site"
                  name="from_site"
                  labelTop={true}
                  required={true}
                  item={values.from_site || null}
                  onChange={handleChange}
                  disabled={disableSiteFrom}
                  error={getErrorMessage('from_site')}
                />
              </div>
              <div className="col-sm-w8">
                <InputDatetime
                  label="Date"
                  name="move_from"
                  id="move_from"
                  required={true}
                  value={values.move_from}
                  onChange={handleChange}
                  disabled={values.globalDisabled}
                  error={getErrorMessage('move_from')}
                />
              </div>
              <div className="col-xs-w4">
                <InputCheckbox
                  label="Camion vide"
                  name="move_from_empty"
                  id="move_from_empty"
                  checked={values.move_from_empty}
                  onChange={handleChange}
                  disabled={values.globalDisabled}
                  error={getErrorMessage('move_from_empty')}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-w12">
                <InputSelect
                  label="Type"
                  id="move_from_type"
                  name="move_from_type"
                  required={values.fromRequired}
                  value={values.move_from_type}
                  onChange={handleChange}
                  options={mvtFromType}
                  addempty={true}
                  disabled={values.globalDisabled}
                  error={getErrorMessage('move_from_type')}
                />
              </div>
              <div className="col-sm-w12">
                <InputText
                  label="N° exploitation / SIREN"
                  name="move_from_num"
                  id="move_from_num"
                  required={values.fromRequired}
                  value={values.move_from_num}
                  onChange={handleChange}
                  disabled={disableSiteFrom}
                  error={getErrorMessage('move_from_num')}
                />
              </div>
              <div className="col-sm-w12">
                <InputText
                  label="Nom"
                  name="move_from_name"
                  id="move_from_name"
                  required={values.fromRequired}
                  value={values.move_from_name}
                  onChange={handleChange}
                  disabled={disableSiteFrom}
                  error={getErrorMessage('move_from_name')}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-w12">
                <InputText
                  label="Adresse"
                  name="move_from_address"
                  id="move_from_address"
                  required={values.fromRequired}
                  value={values.move_from_address}
                  onChange={handleChange}
                  disabled={disableSiteFrom}
                  error={getErrorMessage('move_from_address')}
                />
              </div>
              <div className="col-sm-w12">
                <InputText
                  label="Code postal"
                  name="move_from_cp"
                  id="move_from_cp"
                  required={values.fromRequired}
                  value={values.move_from_cp}
                  onChange={handleChange}
                  disabled={disableSiteFrom}
                  error={getErrorMessage('move_from_cp')}
                />
              </div>
              <div className="col-sm-w12">
                <InputText
                  label="Ville"
                  name="move_from_town"
                  id="move_from_town"
                  required={values.fromRequired}
                  value={values.move_from_town}
                  onChange={handleChange}
                  disabled={disableSiteFrom}
                  error={getErrorMessage('move_from_town')}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-w9">
                <InputText
                  label="Nb Ovins (boucherie)"
                  name="move_from_number_1"
                  id="move_from_number_1"
                  required={values.fromRequired}
                  value={values.move_from_number_1}
                  onChange={handleChange}
                  disabled={values.globalDisabled}
                  error={getErrorMessage('move_from_number_1')}
                />
              </div>
              <div className="col-sm-w9">
                <InputText
                  label="Nb Ovins (reproducteur)"
                  name="move_from_number_2"
                  id="move_from_number_2"
                  required={values.fromRequired}
                  value={values.move_from_number_2}
                  onChange={handleChange}
                  disabled={values.globalDisabled}
                  error={getErrorMessage('move_from_number_2')}
                />
              </div>
              <div className="col-sm-w9">
                <InputText
                  label="Nb Caprins (boucherie)"
                  name="move_from_number_3"
                  id="move_from_number_3"
                  required={values.fromRequired}
                  value={values.move_from_number_3}
                  onChange={handleChange}
                  disabled={values.globalDisabled}
                  error={getErrorMessage('move_from_number_3')}
                />
              </div>
              <div className="col-sm-w9">
                <InputText
                  label="Nb Caprins (reproducteur)"
                  name="move_from_number_4"
                  id="move_from_number_4"
                  required={values.fromRequired}
                  value={values.move_from_number_4}
                  onChange={handleChange}
                  disabled={values.globalDisabled}
                  error={getErrorMessage('move_from_number_4')}
                />
              </div>
            </div>
          </div>
        )}
        {values.__currentTab === '4' && (
          <div>
            <div className="row">
              <div className="col-sm-w12">
                <SiteInputPicker
                  label="Site d'arrivée"
                  key="to_site"
                  name="to_site"
                  labelTop={true}
                  required={true}
                  item={values.to_site || null}
                  onChange={handleChange}
                  disabled={disableSiteTo}
                  error={getErrorMessage('to_site')}
                />
              </div>
              <div className="col-sm-w8">
                <InputDatetime
                  label="Date"
                  name="move_to"
                  id="move_to"
                  required={true}
                  value={values.move_to}
                  onChange={handleChange}
                  disabled={values.globalDisabled}
                  error={getErrorMessage('move_to')}
                />
              </div>
              <div className="col-xs-w12">
                <InputCheckbox
                  label="Camion vide"
                  name="move_to_empty"
                  id="move_to_empty"
                  checked={values.move_to_empty || false}
                  onChange={handleChange}
                  disabled={values.globalDisabled}
                  error={getErrorMessage('move_to_empty')}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-w12">
                <InputSelect
                  label="Type"
                  id="move_to_type"
                  name="move_to_type"
                  required={values.toRequired}
                  value={values.move_to_type}
                  onChange={handleChange}
                  options={mvtToType}
                  addempty={true}
                  disabled={values.globalDisabled}
                  error={getErrorMessage('move_to_type')}
                />
              </div>
              <div className="col-sm-w12">
                <InputText
                  label="N° exploitation / SIREN"
                  name="move_to_num"
                  id="move_to_num"
                  required={values.toRequired}
                  value={values.move_to_num}
                  onChange={handleChange}
                  disabled={disableSiteTo}
                  error={getErrorMessage('move_to_num')}
                />
              </div>
              <div className="col-sm-w12">
                <InputText
                  label="Nom"
                  name="move_to_name"
                  id="move_to_name"
                  required={values.toRequired}
                  value={values.move_to_name}
                  onChange={handleChange}
                  disabled={disableSiteTo}
                  error={getErrorMessage('move_to_name')}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-w12">
                <InputText
                  label="Adresse"
                  name="move_to_address"
                  id="move_to_address"
                  required={values.toRequired}
                  value={values.move_to_address}
                  onChange={handleChange}
                  disabled={disableSiteTo}
                  error={getErrorMessage('move_to_address')}
                />
              </div>
              <div className="col-sm-w12">
                <InputText
                  label="Code postal"
                  name="move_to_cp"
                  id="move_to_cp"
                  required={values.toRequired}
                  value={values.move_to_cp}
                  onChange={handleChange}
                  disabled={disableSiteTo}
                  error={getErrorMessage('move_to_cp')}
                />
              </div>
              <div className="col-sm-w12">
                <InputText
                  label="Ville"
                  name="move_to_town"
                  id="move_to_town"
                  required={values.toRequired}
                  value={values.move_to_town}
                  onChange={handleChange}
                  disabled={disableSiteTo}
                  error={getErrorMessage('move_to_town')}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-w9">
                <InputText
                  label="Nb Ovins (boucherie)"
                  name="move_to_number_1"
                  id="move_to_number_1"
                  required={values.toRequired}
                  value={values.move_to_number_1}
                  onChange={handleChange}
                  disabled={values.globalDisabled}
                  error={getErrorMessage('move_to_number_1')}
                />
              </div>
              <div className="col-sm-w9">
                <InputText
                  label="Nb Ovins (reproducteur)"
                  name="move_to_number_2"
                  id="move_to_number_2"
                  required={values.toRequired}
                  value={values.move_to_number_2}
                  onChange={handleChange}
                  disabled={values.globalDisabled}
                  error={getErrorMessage('move_to_number_2')}
                />
              </div>
              <div className="col-sm-w9">
                <InputText
                  label="Nb Caprins (boucherie)"
                  name="move_to_number_3"
                  id="move_to_number_3"
                  required={values.toRequired}
                  value={values.move_to_number_3}
                  onChange={handleChange}
                  disabled={values.globalDisabled}
                  error={getErrorMessage('move_to_number_3')}
                />
              </div>
              <div className="col-sm-w9">
                <InputText
                  label="Nb Caprins (reproducteur)"
                  name="move_to_number_4"
                  id="move_to_number_4"
                  required={values.toRequired}
                  value={values.move_to_number_4}
                  onChange={handleChange}
                  disabled={values.globalDisabled}
                  error={getErrorMessage('move_to_number_4')}
                />
              </div>
            </div>
          </div>
        )}
        {values.__currentTab === '9' && (
          <div>
            {values.__modify ? (
              <div className="border border-secondary rounded overflow-x-hidden">
                <InlineCauses movement={values} />
              </div>
            ) : (
              <CauseMultiInputPicker
                label="Animal"
                name="causes"
                id="causes"
                labelTop={true}
                causes={values.causes}
                cause_types={props.cause_types}
                onChange={handleChange}
                disabled={values.globalDisabled}
                conditions={[{ name: 'site_id', value: values.from_site.id, oper: FILTER_OPER_EQUAL }]}
              />
            )}
          </div>
        )}
      </div>
    </ResponsiveModalOrForm>
  );
}

export default injectIntl(Form);

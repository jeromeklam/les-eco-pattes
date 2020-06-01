import React from 'react';
import { InputHidden, InputText, InputSelect, InputCheckbox } from 'freeassofront';
import { MultiInputPicker as CauseMultiInputPicker } from '../cause';
import { InputPicker as SiteInputPicker } from '../site';
import { Movement as MovementIcon, Cause as CauseIcon } from '../icons';
import { useForm, ResponsiveModalOrForm, InputDatetime } from '../ui';
import { fromTypeSelect, toTypeSelect, getModeLabel, getTypeMvt, mvtTypes } from './';

const tabs = [
  {
    key: '1',
    name: 'causes',
    label: 'Animaux',
    shortcut: 'C',
    icon: <CauseIcon />,
  },
  {
    key: '2',
    name: 'move',
    label: 'Transport',
    shortcut: 'M',
    icon: <MovementIcon />,
  },
  {
    key: '3',
    name: 'from',
    label: 'Départ',
    shortcut: 'D',
    icon: <MovementIcon />,
  },
  {
    key: '4',
    name: 'to',
    label: 'Arrivée',
    shortcut: 'A',
    icon: <MovementIcon />,
  },
];

export default function Form(props) {
  const {
    values,
    handleChange,
    handleSubmit,
    handleCancel,
    getErrorMessage,
    handleNavTab,
  } = useForm(props.item, props.tab, props.onSubmit, props.onCancel, props.onNavTab, props.errors);
  return (
    <ResponsiveModalOrForm
      className=""
      title={getModeLabel(props.mode)}
      tab={values.currentTab}
      tabs={tabs}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onNavTab={handleNavTab}
      onClose={props.onClose}
      modal={props.modal || false}
    >
      <div className="card-body">
        <InputHidden name="id" id="id" value={values.id} />
        <div className="row">
          <div className="col-8">
            <InputSelect
              label="Type"
              id="move_type"
              name="move_type"
              required={true}
              value={values.move_type}
              onChange={handleChange}
              options={mvtTypes}
              addempty={true}
              error={getErrorMessage('move_type')}
            />
          </div>
          <div className="col-8">
            <InputDatetime
              label="Date"
              name="move_to"
              id="move_to"
              required={true}
              value={values.move_to}
              onChange={handleChange}
              error={getErrorMessage('move_to')}
            />
          </div>

          <div className="col-sm-14">
            <SiteInputPicker
              label="Site"
              key="from_site"
              name="from_site"
              labelTop={true}
              item={values.from_site || null}
              onChange={handleChange}
              error={getErrorMessage('from_site')}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-16"></div>
          <div className="col-sm-14">
            <SiteInputPicker
              label="Site"
              key="to_site"
              name="to_site"
              labelTop={true}
              item={values.to_site || null}
              onChange={handleChange}
              error={getErrorMessage('to_site')}
            />
          </div>
        </div>
        <hr />
        {values.currentTab === '1' && (
          <div>
              <CauseMultiInputPicker
                label="Animal"
                name="move_desc"
                id="move_desc"
                labelTop={true}
                causes={values.causes}
                onChange={handleChange}
              />
          </div>
        )}

        {values.currentTab === '2' && (
          <div>
            <div className="row">
              <div className="col-12">
                <InputText
                  label="Nom transporteur"
                  name="move_tr_name"
                  id="move_tr_name"
                  required={true}
                  value={values.move_tr_name}
                  onChange={handleChange}
                  error={getErrorMessage('move_tr_name')}
                />
              </div>
              <div className="col-sm-12">
                <InputText
                  label="N° transporteur"
                  name="move_tr_num"
                  id="move_tr_num"
                  required={true}
                  value={values.move_tr_num}
                  onChange={handleChange}
                  error={getErrorMessage('move_tr_num')}
                />
              </div>
              <div className="col-sm-12">
                <InputText
                  label="N° véhicule"
                  name="move_tr_num2"
                  id="move_tr_num2"
                  required={true}
                  value={values.move_tr_num2}
                  onChange={handleChange}
                  error={getErrorMessage('move_tr_num2')}
                />
              </div>
            </div>
          </div>
        )}
        {values.currentTab === '3' && (
            <div>
            <div className="row">
              <div className="col-12">
                <InputDatetime
                  label="Le"
                  name="move_from"
                  id="move_from"
                  required={true}
                  value={values.move_from}
                  onChange={handleChange}
                  error={getErrorMessage('move_from')}
                />
              </div>
              <div className="col-12">
                <InputSelect
                  label="Type"
                  id="move_from_type"
                  name="move_from_type"
                  required={true}
                  value={values.move_from_type}
                  onChange={handleChange}
                  options={fromTypeSelect}
                  addempty={true}
                  error={getErrorMessage('move_from_type')}
                />
              </div>
              <div className="col-12">
                <InputCheckbox
                  label="Camion vide"
                  name="move_from_empty"
                  id="move_from_empty"
                  checked={values.move_from_empty}
                  onChange={handleChange}
                  error={getErrorMessage('move_from_empty')}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <InputText
                  label="N° exploitation / SIREN"
                  name="move_from_num"
                  id="move_from_num"
                  required={true}
                  value={values.move_from_num}
                  onChange={handleChange}
                  error={getErrorMessage('move_from_num')}
                />
              </div>
              <div className="col-sm-12">
                <InputText
                  label="Nom"
                  name="move_from_name"
                  id="move_from_name"
                  required={true}
                  value={values.move_from_name}
                  onChange={handleChange}
                  error={getErrorMessage('move_from_name')}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <InputText
                  label="Adresse"
                  name="move_from_address"
                  id="move_from_address"
                  required={true}
                  value={values.move_from_address}
                  onChange={handleChange}
                  error={getErrorMessage('move_from_address')}
                />
              </div>
              <div className="col-sm-12">
                <InputText
                  label="Code postal"
                  name="move_from_cp"
                  id="move_from_cp"
                  required={true}
                  value={values.move_from_cp}
                  onChange={handleChange}
                  error={getErrorMessage('move_from_cp')}
                />
              </div>
              <div className="col-sm-12">
                <InputText
                  label="Ville"
                  name="move_from_town"
                  id="move_from_town"
                  required={true}
                  value={values.move_from_town}
                  onChange={handleChange}
                  error={getErrorMessage('move_from_town')}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-9">
                <InputText
                  label="Nb Ovins (boucherie)"
                  name="move_from_number_1"
                  id="move_from_number_1"
                  required={true}
                  value={values.move_from_number_1}
                  onChange={handleChange}
                  error={getErrorMessage('move_from_number_1')}
                />
              </div>
              <div className="col-sm-9">
                <InputText
                  label="Nb Ovins (reproducteur)"
                  name="move_from_number_2"
                  id="move_from_number_2"
                  required={true}
                  value={values.move_from_number_2}
                  onChange={handleChange}
                  error={getErrorMessage('move_from_number_2')}
                />
              </div>
              <div className="col-sm-9">
                <InputText
                  label="Nb Caprins (boucherie)"
                  name="move_from_number_3"
                  id="move_from_number_3"
                  required={true}
                  value={values.move_from_number_3}
                  onChange={handleChange}
                  error={getErrorMessage('move_from_number_3')}
                />
              </div>
              <div className="col-sm-9">
                <InputText
                  label="Nb Caprins (reproducteur)"
                  name="move_from_number_4"
                  id="move_from_number_4"
                  required={true}
                  value={values.move_from_number_4}
                  onChange={handleChange}
                  error={getErrorMessage('move_from_number_4')}
                />
              </div>
            </div>
          </div>
        )}
        {values.currentTab === '4' && (
          <div>
            <div className="row">
            <div className="col-12">
                <InputDatetime
                  label="Le"
                  name="move_to"
                  id="move_to"
                  required={true}
                  value={values.move_to}
                  onChange={handleChange}
                  error={getErrorMessage('move_to')}
                />
              </div>
              <div className="col-12">
                <InputSelect
                  label="Type"
                  id="move_to_type"
                  name="move_to_type"
                  required={true}
                  value={values.move_to_type}
                  onChange={handleChange}
                  options={toTypeSelect}
                  addempty={true}
                  error={getErrorMessage('move_to_type')}
                />
              </div>
              <div className="col-12">
                <InputCheckbox
                  label="Camion vide"
                  name="move_to_empty"
                  id="move_to_empty"
                  required={true}
                  checked={values.move_to_empty || false}
                  onChange={handleChange}
                  error={getErrorMessage('move_to_empty')}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <InputText
                  label="N° exploitation / SIREN"
                  name="move_to_num"
                  id="move_to_num"
                  required={true}
                  value={values.move_to_num}
                  onChange={handleChange}
                  error={getErrorMessage('move_to_num')}
                />
              </div>
              <div className="col-sm-12">
                <InputText
                  label="Nom"
                  name="move_to_name"
                  id="move_to_name"
                  required={true}
                  value={values.move_to_name}
                  onChange={handleChange}
                  error={getErrorMessage('move_to_name')}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <InputText
                  label="Adresse"
                  name="move_to_address"
                  id="move_to_address"
                  required={true}
                  value={values.move_to_address}
                  onChange={handleChange}
                  error={getErrorMessage('move_to_address')}
                />
              </div>
              <div className="col-sm-12">
                <InputText
                  label="Code postal"
                  name="move_to_cp"
                  id="move_to_cp"
                  required={true}
                  value={values.move_to_cp}
                  onChange={handleChange}
                  error={getErrorMessage('move_to_cp')}
                />
              </div>
              <div className="col-sm-12">
                <InputText
                  label="Ville"
                  name="move_to_town"
                  id="move_to_town"
                  required={true}
                  value={values.move_to_town}
                  onChange={handleChange}
                  error={getErrorMessage('move_to_town')}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-9">
                <InputText
                  label="Nb Ovins (boucherie)"
                  name="move_to_number_1"
                  id="move_to_number_1"
                  required={true}
                  value={values.move_to_number_1}
                  onChange={handleChange}
                  error={getErrorMessage('move_to_number_1')}
                />
              </div>
              <div className="col-sm-9">
                <InputText
                  label="Nb Ovins (reproducteur)"
                  name="move_to_number_2"
                  id="move_to_number_2"
                  required={true}
                  value={values.move_to_number_2}
                  onChange={handleChange}
                  error={getErrorMessage('move_to_number_2')}
                />
              </div>
              <div className="col-sm-9">
                <InputText
                  label="Nb Caprins (boucherie)"
                  name="move_to_number_3"
                  id="move_to_number_3"
                  required={true}
                  value={values.move_to_number_3}
                  onChange={handleChange}
                  error={getErrorMessage('move_to_number_3')}
                />
              </div>
              <div className="col-sm-9">
                <InputText
                  label="Nb Caprins (reproducteur)"
                  name="move_to_number_4"
                  id="move_to_number_4"
                  required={true}
                  value={values.move_to_number_4}
                  onChange={handleChange}
                  error={getErrorMessage('move_to_number_4')}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </ResponsiveModalOrForm>
  );
}

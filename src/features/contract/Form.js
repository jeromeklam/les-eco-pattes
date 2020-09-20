import React from 'react';
import { InputHidden, InputText, InputMonetary } from 'freeassofront';
import useForm from '../ui/useForm';
import { ResponsiveModalOrForm, InputDate, InputData } from '../ui';
import { InputPicker as SiteInputPicker } from '../site';
import { InputPicker as ClientInputPicker } from '../client';
import { InlineDocuments } from '../contract';

export default function Form(props) {
  const {
    values,
    handleChange,
    handleSubmit,
    handleCancel,
    handleNavTab,
    getErrorMessage,
  } = useForm(props.item, props.tab, props.onSubmit, props.onCancel, props.onNavTab, props.errors);
  console.log("FK contract",values);
  return (
    <ResponsiveModalOrForm
      title="Contrat"
      tab={values.currentTab}
      tabs={props.tabs}
      size="md"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onNavTab={handleNavTab}
      onClose={props.onClose}
      modal={props.modal || false}
    >
      <div className="card-body">
        <InputHidden name="id" id="id" value={values.id} />
        <div className="row">
          <div className="col-sm-8">
            <InputText
              label="Numéro"
              name="ct_code"
              id="ct_code"
              required={true}
              mask={'0000.000'}
              value={values.ct_code}
              onChange={handleChange}
              error={getErrorMessage('ct_code')}
            />
          </div>
          <div className="col-sm-20">
            <SiteInputPicker
              label="Site"
              key="site"
              name="site"
              labelTop={true}
              required={true}
              item={values.site || null}
              onChange={handleChange}
              error={getErrorMessage('site')}
            />
          </div>
          <div className="col-8">
            <InputData
              name="ct_duration"
              value={values.ct_duration}
              datas={props.tab_datas}
              config={props.tab_configs}
              onChange={handleChange}
              labelTop={true}
            />
          </div>
        </div>
        <hr />
        {values.currentTab === '1' && (
          <div>
            <div className="row">
              <div className="col-sm-12">
                <InputDate
                  label="Début début"
                  name="ct_from"
                  id="ct_from"
                  required={true}
                  value={values.ct_from}
                  onChange={handleChange}
                  error={getErrorMessage('ct_from')}
                />
              </div>
              <div className="col-sm-12">
                <InputDate
                  label="Fin"
                  name="ct_to"
                  id="ct_to"
                  value={values.ct_to}
                  onChange={handleChange}
                  error={getErrorMessage('ct_to')}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-10">
                <InputMonetary
                  label="Montant à l'installation"
                  labelTop={true}
                  name="ct_install_amount"
                  id="ct_install_amount"
                  inputMoney="EUR"
                  dbMoney="EUR"
                  value={values.ct_install_amount}
                />
              </div>
              <div className="col-sm-10">
                <InputMonetary
                  label="Montant récurrent"
                  labelTop={true}
                  name="ct_recur_amount"
                  id="ct_recur_amount"
                  inputMoney="EUR"
                  dbMoney="EUR"
                  value={values.ct_recur_amount}
                />
              </div>
              <div className="col-sm-4">
              </div>
              <div className="col-sm-12">
                <InputDate
                  label="Facturé le"
                  name="ct_next_bill"
                  id="ct_next_bill"
                  value={values.ct_next_bill}
                  onChange={handleChange}
                  error={getErrorMessage('ct_next_bill')}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-24">
                <InputText
                  label="Adresse"
                  name="ct_address_1"
                  value={values.ct_address_1}
                  onChange={handleChange}
                  labtop={true}
                  error={getErrorMessage('ct_address_1')}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-24">
                <InputText
                  label="Adresse"
                  name="ct_address_2"
                  value={values.ct_address_2}
                  onChange={handleChange}
                  labtop={true}
                  error={getErrorMessage('ct_address_2')}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <InputText
                  label="CP"
                  name="ct_cp"
                  value={values.ct_cp}
                  onChange={handleChange}
                  labtop={true}
                  error={getErrorMessage('ct_cp')}
                />
              </div>
              <div className="col-sm-18">
                <InputText
                  label="Commune"
                  name="ct_town"
                  value={values.ct_town}
                  onChange={handleChange}
                  labtop={true}
                  error={getErrorMessage('ct_town')}
                />
              </div>
            </div>
          </div>
        )}
        {values.currentTab === '2' && (
          <div>
            <div className="row">
              <div className="col-12">
                <ClientInputPicker
                  label="Contact 1"
                  key="contact1"
                  name="contact1"
                  item={values.contact1 || null}
                  onChange={handleChange}
                  error={getErrorMessage('contact1')}
                  typeCodes={['']}
                />
             </div>
            </div>
            <div className="row">
              <div className="col-12">
                <ClientInputPicker
                  label="Contact 2"
                  key="contact2"
                  name="contact2"
                  item={values.contact2 || null}
                  onChange={handleChange}
                  error={getErrorMessage('contact2')}
                  typeCodes={['']}
                />
             </div>
            </div>
          </div>
        )}
        {values.currentTab === '3' && (
          <div className="border border-secondary rounded overflow-x-hidden">
            <InlineDocuments ctId={values.id} />
          </div>
        )}
      </div>
    </ResponsiveModalOrForm>
  );
}

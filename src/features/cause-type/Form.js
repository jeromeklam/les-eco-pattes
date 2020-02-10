import React from 'react';
import { InputHidden, InputText, InputSelect, ResponsiveForm } from 'freeassofront';
import useForm from '../ui/useForm';
import { causeMainTypeAsOptions } from '../cause-main-type/functions.js';

export default function Form(props) {
  const { values, handleChange, handleSubmit, handleCancel, getErrorMessage } = useForm(
    props.item,
    '',
    props.onSubmit,
    props.onCancel,
    null,
    props.errors,
  );
  return (
    <ResponsiveForm className="" title="Race" onSubmit={handleSubmit} onCancel={handleCancel}>
      <div className="card-body">
        <InputHidden name="id" id="id" value={values.id} />
        <div className="row">
          <div className="col-sm-18">
            <InputText
              label="Nom"
              name="caut_name"
              id="caut_name"
              value={values.caut_name}
              onChange={handleChange}
              error={getErrorMessage('caut_name')}
            />
          </div>
          <div className="col-sm-18">
            <InputSelect
              label="Espèce"
              name="cause_main_type.id"
              id="cause_main_type.id"
              value={values.cause_main_type ? values.cause_main_type.id : null}
              onChange={handleChange}
              options={causeMainTypeAsOptions(props.causeMainTypes)}
              error={getErrorMessage('cause_main_type')}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-36">
            <InputText
              label="Expression de saisie du n° de boucle"
              name="caut_pattern"
              id="caut_pattern"
              value={values.caut_pattern}
              onChange={handleChange}
              error={getErrorMessage('caut_pattern')}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <InputText
              label="Poids maximum (kg)"
              name="caut_max_weight"
              id="caut_max_weight"
              value={values.caut_max_weight}
              onChange={handleChange}
              error={getErrorMessage('caut_max_weight')}
            />
          </div>
          <div className="col-sm-12">
            <InputText
              label="Taille maximum (cm)"
              name="caut_max_height"
              id="caut_max_height"
              value={values.caut_max_height}
              onChange={handleChange}
              error={getErrorMessage('caut_max_height')}
            />
          </div>
          <div className="col-sm-12">
            <InputText
              label="Fréquence de contrôle (mois)"
              name="caut_growth_freq"
              id="caut_growth_freq"
              value={values.caut_growth_freq}
              onChange={handleChange}
              error={getErrorMessage('caut_growth_freq')}
            />
          </div>
        </div>
      </div>
    </ResponsiveForm>
  );
}

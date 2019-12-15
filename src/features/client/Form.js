import React from 'react';
import { 
  InputHidden, 
  InputText, 
  InputSelect, 
  FormResponsive 
} from '../layout';
import useForm from '../layout/useForm';

export default function Form(props) {
  const { values, handleChange, handleSubmit, handleCancel } = useForm(
    props.item,
    '',
    props.onSubmit,
    props.onCancel,
  );
  return (
    <FormResponsive title="Personne" onSubmit={handleSubmit} onCancel={handleCancel}>
      <div className="card-body">
        <InputHidden name="id" id="id" value={values.id} />
        {values.cli_firstname === null &&
          <InputText
            label="Nom"
            name="cli_lastname"
            id="cli_lastname"
            required={true}
            value={values.cli_lastname}
            onChange={handleChange}
          />
        } 
        {values.cli_firstname !== null &&
          <div className="row">
            <div className="col-sm-18">
              <InputText
                label="Nom"
                name="cli_lastname"
                id="cli_lastname"
                required={true}
                value={values.cli_lastname}
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-18">
              <InputText
                label="Prénom"
                name="cli_firstname"
                id="cli_firstname"
                value={values.cli_firstname}
                onChange={handleChange}
              />
            </div>
          </div>
        }
        <InputText
          label="Adresse"
          name="cli_address1"
          value={values.cli_address1}
          onChange={handleChange}
        />
        <div className="row">
          <div className="col-sm-9">
            <InputText
              label="CP"
              name="cli_cp"
              value={values.cli_cp}
              onChange={handleChange}
            />
          </div>
          <div className="col-sm-27" >
            <InputText 
              label="Commune" 
              name="cli_town" 
              value={values.cli_town} 
              onChange={handleChange} 
            />
          </div>
        </div>
      </div>
    </FormResponsive>
  );
}
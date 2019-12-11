import React from 'react';
import { 
  InputHidden, 
  InputText, 
  InputSelect, 
  InputData, 
  InputTextArea,
  FormResponsive 
} from '../layout';
import useForm from '../layout/useForm';
import { siteTypeAsOptions } from '../site-type/functions.js';
import { InputPicker as ClientInputPicker } from '../client';

export default function Form(props) {
  const { values, handleChange, handleSubmit, handleCancel, handleNavTab } = useForm(
    props.item,  
    props.tab,  
    props.onSubmit,
    props.onCancel,
    props.onNavTab,
  ); 
  return (    
    <FormResponsive title="Sites" tab={values.currentTab} tabs={props.tabs} onSubmit={handleSubmit} onCancel={handleCancel} onNavTab={handleNavTab}>
      <InputHidden name="id" id="id" value={values.id} />    
      <div className="row">  
        <div className="col-sm-28" >
          <InputText
            label="Nom"
            required={true}
            name="site_name"
            value={values.site_name}
            onChange={handleChange}
          />  
        </div>
        <div className="col-sm-8" >
          <InputText
            label="N°"
            name="site_code"
            value={values.site_code}
            onChange={handleChange}
          />  
        </div>
      </div>
      <hr />
      {values.currentTab === "1" && 
        <div>
          <InputText
            label="Adresse"
            name="site_address1"
            value={values.site_address1}
            onChange={handleChange}
          />
          <div className="row">
            <div className="col-sm-9">
              <InputText
                label="CP"
                name="site_cp"
                value={values.site_cp}
                onChange={handleChange}
              />
            </div>
            <div className="col-sm-27" >
              <InputText 
                label="Commune" 
                name="site_town" 
                value={values.site_town} 
                onChange={handleChange} 
              />
            </div>
          </div>
          <InputText 
            label="Surface" 
            name="site_area" 
            value={values.site_area} 
            onChange={handleChange} 
          />
          <InputText 
            label="Parcelles" 
            name="site_plots" 
            value={values.site_plots} 
            onChange={handleChange} 
          />
          <InputSelect
            label="Type"
            name="site_type.id"
            required={true}
            value={values.site_type ? values.site_type.id : null}            
            onChange={handleChange}
            options={siteTypeAsOptions(props.site_types)}
            addempty={true}
          />     
          <ClientInputPicker 
            label="Propriétaire"
            key="owner"
            name="owner"
            item={values.owner || null}
            onChange={handleChange}
          />       
        </div>
      }
      {values.currentTab === "2" &&  
        <div>             
          {props.properties.map(oneProp => {
            let nameProp = "site_" + oneProp;
            return (                      
                <InputData 
                  key={nameProp}
                  name={nameProp}
                  value={values[nameProp]}
                  datas={props.datas}
                  config={props.config}
                  addempty={false}
                  onChange={handleChange}
                />          
              )          
             
          })}
        </div>
      }
      {values.currentTab === "3" &&       
        <div>
          <InputText 
            label="N° élevage EDE" 
            name="site_code_ex" 
            value={values.site_code_ex} 
            onChange={handleChange} 
          /> 
         <ClientInputPicker 
            label="Vétérinaire"
            key="sanitary"
            name="sanitary"
            item={values.sanitary || null}
            onChange={handleChange}
          />       
          <InputTextArea
            label="Observations" 
            name="site_desc" 
            value={values.site_desc} 
            onChange={handleChange} 
          />
        </div>
      }
    </FormResponsive>
  );
}

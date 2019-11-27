import React, { Component } from 'react';
import { InputHidden, InputText, InputSelect, InputData, FormResponsive } from '../layout';
import { siteTypeAsOptions } from '../site-type/functions.js';
import useForm from '../layout/useForm';

export default function Form(props) {
  const { values, handleChange, handleSubmit, handleCancel, handleNavTab } = useForm(
    props.item,  
    props.tab,  
    props.onSubmit,
    props.onCancel,
    props.onNavTab,
  );  
  return (    
    <FormResponsive title="Sites" tabs={props.tabs} onSubmit={handleSubmit} onCancel={handleCancel} onNavTab={handleNavTab}>
      <InputHidden name="id" id="id" value={values.id} />      
      <InputText
        label="Nom"
        required={true}
        name="site_name"
        value={values.site_name}
        onChange={handleChange}
      />  
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
          <InputSelect
            label="Type"
            name="site_type.id"
            required={true}
            value={values.site_type.id}
            onChange={handleChange}
            options={siteTypeAsOptions(props.site_types)}
            addempty={true}
          />     
        </div>
      }
      {values.currentTab === "2" &&        
        <div>             
          {props.properties.map(oneProp => {
            let nameProp = "site_" + oneProp;
            let cfgProp = "sitt_" + oneProp      
            return (          
              values.site_type[cfgProp] && (            
                <InputData 
                  key={nameProp}
                  name={nameProp}
                  value={values[nameProp]}
                  datas={props.datas}
                  config={props.config}
                  onChange={handleChange}
                />          
              )          
            )        
          })}
        </div>
      }
    </FormResponsive>
  );
}

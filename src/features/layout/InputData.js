import React, { Component } from 'react';
import { buildModel } from '../../common';
import { InputText, InputTextArea, InputSelect } from '../layout';

function getFieldData(field_name, tab_config, tab_data) {
  const myDatas = buildModel(tab_data, 'FreeAsso_Data');
  //console.log(myDatas, tab_data);
  let data = false;
  Object.keys(tab_config.FreeAsso_Config).forEach((key) => {
    //console.log(key);
    //console.log(tab_config.FreeAsso_Config[key]);
    if (tab_config.FreeAsso_Config[key].attributes.acfg_code == ('DATA_ID@' + field_name.toUpperCase())) {
      const data_id = tab_config.FreeAsso_Config[key].attributes.acfg_value;
      myDatas.forEach((oneData) => {
        if (oneData.id == data_id) {
          data = oneData;
          return true;
        }
      });
      return false; // pour quitter la boucle
    }
  });
  return data;
}

export default class InputData extends Component {
  static propTypes = {

  };

  constructor(props) {
    super(props);
    this.state = {
      field: props.name,
      data: getFieldData(props.name, props.config, props.datas)
    };
  }

  render() {            
    let options = [];
    if (this.state.data.data_type == "LIST" ) {         
      const list = JSON.parse(this.state.data.data_content);         
      list.forEach((option) => {        
        options.push({value: option, label: option});
      });
    }     
    return (
      <div>
        {this.state.data.data_type == "STRING" &&
          <InputText
            label={this.state.data.data_name}
            name={this.state.field}
            value={this.props.value}
            onChange={this.props.onChange}
          />
        }
        {this.state.data.data_type == "TEXT" &&
          <InputTextArea
            label={this.state.data.data_name}
            name={this.state.field}
            value={this.props.value}
            onChange={this.props.onChange}
          />
        }
        {this.state.data.data_type == "LIST" &&            
          <InputSelect
            label={this.state.data.data_name}
            name={this.state.field}
            required={this.props.required}
            value={this.props.value}
            onChange={this.props.onChange}
            options={options}
            addempty={true}
          />
        }
      </div>
    );
  }
}

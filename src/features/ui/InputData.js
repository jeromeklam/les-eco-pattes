import React, { Component } from 'react';
import { normalizedObjectModeler } from 'jsonapi-front';
import { InputText, InputTextarea, InputSelect, InputCheckbox } from 'react-bootstrap-front';

function getFieldData(field_name, tab_config, tab_data) {
  const myDatas = normalizedObjectModeler(tab_data, 'FreeAsso_Data');
  let data = false;
  Object.keys(tab_config.FreeAsso_Config).forEach(key => {
    //console.log(key);
    //console.log(tab_config.FreeAsso_Config[key]);
    if (
      tab_config.FreeAsso_Config[key].attributes.acfg_code ===
      'DATA_ID@' + field_name.toUpperCase()
    ) {
      const data_id = tab_config.FreeAsso_Config[key].attributes.acfg_value;
      myDatas.forEach(oneData => {
        if (oneData.id === data_id) {
          data = oneData;
          return data;
        }
      });
      return false; // pour quitter la boucle
    }
  });
  return data;
}

export default class InputData extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      field: props.name,
      data: getFieldData(props.name, props.config, props.datas),
    };
  }

  render() {
    let list = [];
    if (this.state.data.data_type === 'LIST') {
      try {
        list = JSON.parse(this.state.data.data_content);
      } catch (ex) {
        // @todo
      }
    }
    return (
      <div>
        {this.state.data.data_type === 'BOOLEAN' && (
          <InputCheckbox
            label={this.state.data.data_name}
            labelTop={this.props.labelTop || true}
            name={this.state.field}
            checked={this.props.value}
            onChange={this.props.onChange}
          />
        )}
        {this.state.data.data_type === 'NUMBER' && (
          <InputText
            label={this.state.data.data_name}
            labelTop={this.props.labelTop || true}
            name={this.state.field}
            value={this.props.value}
            onChange={this.props.onChange}
          />
        )}
        {this.state.data.data_type === 'STRING' && (
          <InputText
            label={this.state.data.data_name}
            labelTop={this.props.labelTop || true}
            name={this.state.field}
            value={this.props.value}
            onChange={this.props.onChange}
          />
        )}
        {this.state.data.data_type === 'TEXT' && (
          <InputTextarea
            label={this.state.data.data_name}
            labelTop={this.props.labelTop || true}
            name={this.state.field}
            value={this.props.value}
            onChange={this.props.onChange}
          />
        )}
        {this.state.data.data_type === 'LIST' && (
          <InputSelect
            label={this.state.data.data_name}
            labelTop={this.props.labelTop || true}
            name={this.state.field}
            required={this.props.required}
            value={this.props.value}
            onChange={this.props.onChange}
            options={list}
            addempty={this.props.addempty}
          />
        )}
      </div>
    );
  }
}

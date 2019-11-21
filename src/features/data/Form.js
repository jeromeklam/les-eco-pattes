import React, { Component } from 'react';
import { 
  InputHidden, 
  InputText,
  InputSelect,
  ButtonSubmit,
  ButtonCancel
} from '../layout';

export default class Form extends Component {
  static propTypes = {

  };

  render() {
    const item        = this.props.item;
    const optionsType = [
      {value: 'STRING', label: "Chaine"},
      {value: 'LIST', label: "Liste"}
    ];
    return (
      <div className="card">
        <form>
          <div className="card-header">
            Données
          </div>
          <div className="card-body">
            <InputHidden name="id" id="id" value={item.id} />
            <InputText
              label="Nom"
              name="data_name"
              value={item.data_name}
              onChange={this.props.onChange}
            />
            <InputSelect
              label="Type"
              name="data_type"
              value={item.data_type}
              addempty={true}
              onChange={this.props.onChange}
              options={optionsType}
            />
          </div>
          <div className="card-footer text-right">
            <ButtonSubmit onClick={this.props.onSubmit}/>
            &nbsp;
            <ButtonCancel onClick={this.props.onCancel}/>
          </div>
        </form>
      </div>
    );
  }
}

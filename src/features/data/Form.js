import React, { Component } from 'react';
import { InputHidden, InputText } from '../layout';

export default class Form extends Component {
  static propTypes = {

  };

  render() {
    const item = this.props.item;
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
              id="data_name"
              value={item.data_name}
              onChange={this.props.onChange}
            />
          </div>
          <div className="card-footer text-right">
            <button type="button" onClick={this.props.onSubmit} className="btn btn-success">Enregistrer</button>
            &nbsp;
            <button type="button" onClick={this.props.onCancel} className="btn btn-danger">Annuler</button>
          </div>
        </form>
      </div>
    );
  }
}

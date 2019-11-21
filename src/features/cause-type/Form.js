import React, { Component } from 'react';
import { 
  InputHidden, 
  InputText,
  ButtonSubmit,
  ButtonCancel
} from '../layout';

export default class Form extends Component {
  static propTypes = {

  };

  render() {
    const item = this.props.item;
    return (
      <div class="card">
        <form>
          <div className="card-header">
            Type d'animaux
          </div>
          <div class="card-body">
            <InputHidden name="id" id="id" value={item.id} />
              <InputText
                label="Nom"
                name="caut_name"
                id="caut_name"
                value={item.caut_name}
                onChange={this.props.onChange}
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

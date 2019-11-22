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

  constructor(props) {
    super(props);
    this.state = {
      site : props.site
    }
  }

  render() {
    const item = this.props.item;
    return (
      <div className="card">
        <form>
          <div className="card-header">
            Sites
          </div>
          <div className="card-body">
            <InputHidden name="id" id="id" value={item.id} />
            <InputText
              label="Nom"
              name="site_name"
              value={item.site_name}
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

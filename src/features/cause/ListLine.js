import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class ListLine extends Component {
  static propTypes = {

  };

  render() {
    const item = this.props.item;
    return (
      <div key={item.id} className="row">      
        <div className="col-12">
          <Link to={"/cause/modify/" + item.id}>
            {this.props.item.cau_name}                     
          </Link>
        </div> 
        <div className="col-12">
          {this.props.item.cause_type.caut_name} 
        </div>
      </div>
    );
  }
}

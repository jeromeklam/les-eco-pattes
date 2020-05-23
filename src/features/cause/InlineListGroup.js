import React, { Component } from 'react';
import {
  Male as MaleIcon,
  Female as FemaleIcon,
} from '../icons';

export default class InlineListGroup extends Component {
  static propTypes = {};

  render() {
    //console.log("FK inline liste cause",this.props.list);
    return (
      <div className="cause-inline-list-group">
        { ( this.props.list && this.props.list.length > 0 ) ? (
          <div>
            <p>Animaux :</p>
            {this.props.list.map(group => {
              return (
                <p key={group.id} title={group.typ}>
                  {group.nb}
                  &nbsp; {group.typ}
                  &nbsp;( {group.sex === 'F' ? <FemaleIcon  className="text-secondary"/> : <MaleIcon  className="text-secondary"/>} )
                </p>
              );
            
            })}
          </div>
          ) : (
            <p>Aucun animal</p>
          ) 
        } 
      </div>
    );
  }
}

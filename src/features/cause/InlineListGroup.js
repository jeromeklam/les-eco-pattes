import React, { Component } from 'react';

export default class InlineListGroup extends Component {
  static propTypes = {};

  render() {
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
                  &nbsp;( {group.sex} )
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
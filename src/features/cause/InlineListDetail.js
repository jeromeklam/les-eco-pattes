import React, { Component } from 'react';

export default class InlineListDetail extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="cause-inline-list-detail">
        {this.props.causes.length > 0 ? (
          <div className="inline-list">
            {this.props.causes.map(cause => (
              <div className="row" key={cause.id}>
                <div className="col-sm-5">
                  <span className="pl-2">{cause.id}</span>
                </div>
                <div className="col-sm-10">
                  <span>{cause.cau_name}</span>
                </div>
                <div className="col-sm-10">
                  <span>{cause.cause_type.caut_name}</span>
                </div>
                <div className="col-sm-5">
                  <span className="pr-2">{cause.cau_sex}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <span>Aucun animal</span>
          </div>
        )}
      </div>
    );
  }
}

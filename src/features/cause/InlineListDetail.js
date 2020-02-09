import React, { Component } from 'react';

export default class InlineListDetail extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="cause-inline-list-detail">
        {this.props.causes && this.props.causes.length > 0 ? (
          <div className="inline-list">
            <div className="row row-title" key="cause-inline-list-detail">
              <div className="col-sm-5">
                <span className="pl-2">Id.</span>
              </div>
              <div className="col-sm-10">
                <span>N° boucle</span>
              </div>
              <div className="col-sm-10">
                <span>Race</span>
              </div>
              <div className="col-sm-5">
                <span className="pr-2">Sexe</span>
              </div>
            </div>
            {this.props.causes.map(cause => (
              <div className="row" key={cause.id}>
                <div className="col-sm-5">
                  <span className="pl-2">{cause.id}</span>
                </div>
                <div className="col-sm-10">
                  <span>{cause.cau_code}</span>
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
          <div className="text-center p-3">
            <span className="text-secondary">Aucun animal</span>
          </div>
        )}
      </div>
    );
  }
}

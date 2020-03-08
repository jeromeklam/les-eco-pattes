import React, { Component } from 'react';
import classnames from 'classnames';
import { getSexlabel } from './';

export default class InlineListDetail extends Component {
  static propTypes = {};

  render() {
    let counter = 0;
    return (
      <div className="cause-inline-list-detail">
        {this.props.causes && this.props.causes.length > 0 ? (
          <div className="inline-list">
            <div className={classnames('row row-title row-line', (counter++ % 2 !== 1) ? 'row-odd' : 'row-even')} key="cause-inline-list-detail">
              <div className="col-sm-3">
                <span className="pl-2">Id.</span>
              </div>
              <div className="col-sm-6">
                <span>N° boucle</span>
              </div>
              <div className="col-sm-6">
                <span>Race</span>
              </div>
              <div className="col-sm-4">
                <span>Année</span>
              </div>
              <div className="col-sm-5">
                <span className="pr-2">Sexe</span>
              </div>
              {this.props.cause && (
                <div className="col-sm-8">
                  {this.props.cause.cau_sex === 'M' ? (
                    <span className="pr-2">Mère</span>
                  ) : (
                    <span className="pr-2">Père</span>
                  )}
                </div>
              )}
            </div>
            {this.props.causes.map(cause => (
              <div className={classnames('row row-line', (counter++ % 2 !== 1) ? 'row-odd' : 'row-even')} key={cause.id}>
                <div className="col-sm-3">
                  <span className="pl-2">{cause.id}</span>
                </div>
                <div className="col-sm-6">
                  <span>{cause.cau_code}</span>
                </div>
                <div className="col-sm-6">
                  <span>{cause.cause_type.caut_name}</span>
                </div>
                <div className="col-sm-4">
                  <span>{cause.caut_year}</span>
                </div>
                <div className="col-sm-5">
                  <span className="pr-2">{getSexlabel(cause.cau_sex)}</span>
                </div>
                {this.props.cause && (
                  <div className="col-sm-8">
                    {this.props.cause.cau_sex === 'M' ? (
                      <span className="pr-2">{cause.parent2 && cause.parent2.cau_code}</span>
                    ) : (
                      <span className="pr-2">{cause.parent1 && cause.parent1.cau_code}</span>
                    )}
                  </div>
                )}
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

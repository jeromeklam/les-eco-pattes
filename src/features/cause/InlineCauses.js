import React, { Component } from 'react';
import classnames from 'classnames';
import { CenteredLoading3Dots } from '../ui';
import { getSexlabel, getCauses } from './';

export default class InlineCauses extends Component {
  static propTypes = {};

  static getDerivedStateFromProps(props, state) {
    if (props.siteId !== state.site_id || props.mode !== state.mode || props.cause !== state.item) {
      return { site_id: props.siteId, mode: props.mode, item: props.cause };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      site_id: props.site_id || 0,
      mode: props.mode || '',
      loading: true,
      item: props.cause || null,
      items: [],
    }
    this.localLoadCauses = this.localLoadCauses.bind(this);
  }

  localLoadCauses() {
    this.setState({ loading: true });
    getCauses(this.state.mode, this.state.site_id, this.state.item).then(result => {
      this.setState({ loading: false, items: result });
    });
  }

  componentDidMount() {
    this.localLoadCauses();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.site_id !== this.state.site_id) {
      this.localLoadCauses();
    }
  }

  render() {
    if (this.state.loading) {
      return (
         <CenteredLoading3Dots />
      )
    }
    let counter = 0;
    let causes = this.state.items;
    return (
      <div className="cause-inline-causes">
        {causes && causes.length > 0 ? (
          <div className="inline-list">
            <div className={classnames('row row-title row-line', (counter++ % 2 !== 1) ? 'row-odd' : 'row-even')} key="cause-inline-causes">
              <div className="col-sm-6 col-first">
                <span>N° boucle</span>
              </div>
              <div className="col-sm-6">
                <span>Race</span>
              </div>
              <div className="col-sm-4">
                <span>Année</span>
              </div>
              <div className="col-sm-3">
                <span className="pr-2">Sexe</span>
              </div>
              {this.state.mode === 'site' || (this.state.mode === 'cause' && this.state.item.cau_sex === 'M') &&
                <div className="col-sm-6">
                  <span className="pr-2">Mère</span>
                </div>
              }
              {this.state.mode === 'site' || (this.state.mode === 'cause' && this.state.item.cau_sex === 'F') &&
                <div className="col-sm-6">
                  <span className="pr-2">Père</span>
                </div>
              }
            </div>
            {causes.map(cause => (
              <div className={classnames('row row-line', (counter++ % 2 !== 1) ? 'row-odd' : 'row-even')} key={cause.id}>
                <div className="col-sm-6 col-first">
                  <span>{cause.cau_code}</span>
                </div>
                <div className="col-sm-6">
                  <span>{cause.cause_type.caut_name}</span>
                </div>
                <div className="col-sm-4">
                  <span>{cause.cau_year}</span>
                </div>
                <div className="col-sm-3">
                  <span className="pr-2">{getSexlabel(cause.cau_sex, true, "text-secondary" )}</span>
                </div>
                {this.state.mode === 'site' || (this.state.mode === 'cause' && this.state.item.cau_sex === 'M') &&
                  <div className="col-sm-6">
                    <span className="pr-2">{cause.parent2 && cause.parent2.cau_code}</span>
                  </div>
                }
                {this.state.mode === 'site' || (this.state.mode === 'cause' && this.state.item.cau_sex === 'F') &&
                  <div className="col-sm-6">
                    <span className="pr-2">{cause.parent1 && cause.parent1.cau_code}</span>
                  </div>
                }
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

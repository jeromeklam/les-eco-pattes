import React, { Component } from 'react';
import classnames from 'classnames';
import { Dropdown } from 'freeassofront';
import { CenteredLoading3Dots } from '../ui';
import { Movement as MovementIcon, MenuDown as MenuDownIcon } from '../icons';
import { Create as CreateMovement } from '../movement';
import { getOne as getOneSite } from '../site';
import { getSexlabel, getCauses } from './';

export default class InlineCauses extends Component {
  static propTypes = {};

  static getDerivedStateFromProps(props, state) {
    if (props.siteId !== state.site_id || props.mode !== state.mode || props.cause !== state.item) {
      return { site_id: props.siteId, site: props.site, mode: props.mode, item: props.cause };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      site: props.site || null,
      site_id: props.site_id || 0,
      mode: props.mode || '',
      loading: true,
      item: props.cause || null,
      items: [],
      selectAll: false,
      selected: [],
      menuMvt: false,
      refMvt: React.createRef(),
      typeMvt: '',
    };
    this.localLoadCauses = this.localLoadCauses.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onSelectAll = this.onSelectAll.bind(this);
    this.onMenuMvt = this.onMenuMvt.bind(this);
    this.onSelectMvt = this.onSelectMvt.bind(this);
    this.onCloseMvt = this.onCloseMvt.bind(this);
  }

  localLoadCauses() {
    this.setState({ loading: true });
    getCauses(this.state.mode, this.state.site_id, this.state.item).then(result => {
      if (this.state.mode === 'site') {
        getOneSite(this.state.site_id).then(otherResult => {
          this.setState({ loading: false, items: result, site: otherResult });
        })
      } else {
        this.setState({ loading: false, items: result });
      }
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

  onSelectAll() {
    const causes_selected = [];
    if (!this.state.selectAll) {
      this.state.items.map(cause => causes_selected.push(cause.id));
    }
    this.setState({ selectAll: !this.state.selectAll, selected: causes_selected });
  }

  onSelect(id) {
    const causes_selected = this.state.selected;
    if (causes_selected.includes(id)) {
      causes_selected.splice(
        causes_selected.findIndex(elem => elem === id),
        1,
      );
    } else {
      causes_selected.push(id);
    }
    this.setState({ selected: causes_selected });
  }

  onMenuMvt() {
    this.setState({ menuMvt: !this.state.menuMvt });
  }

  onSelectMvt(mvt) {
    this.setState({ typeMvt: mvt });
  }

  onCloseMvt() {
    this.setState({ typeMvt: '' });
  }

  render() {
    if (this.state.loading) {
      return <CenteredLoading3Dots />;
    }
    let counter = 0;
    let causes = this.state.items;
    let selected = this.state.selected;
    return (
      <div className="cause-inline-causes">
        {causes && causes.length > 0 ? (
          <div className="inline-list">
            <div
              className={classnames(
                'row row-title row-line',
                counter++ % 2 !== 1 ? 'row-odd' : 'row-even',
              )}
              key="cause-inline-causes"
            >
              <div className="col-sm-1 col-first">
                <div
                  className={classnames(
                    'inline-select-line border border-secondary mr-2',
                    this.state.selectAll && 'selected'
                  )}
                  onClick={this.onSelectAll}
                >
                  <div className="inline-select-line-inner bg-secondary" />
                </div>
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
              <div className="col-sm-3">
                <span className="pr-2">Sexe</span>
              </div>
              {(this.state.mode === 'site' ||
                (this.state.mode === 'cause' && this.state.item.cau_sex === 'M')) && (
                <div className="col-sm-6">
                  <span className="pr-2">Mère</span>
                </div>
              )}
              {(this.state.mode === 'site' ||
                (this.state.mode === 'cause' && this.state.item.cau_sex === 'F')) && (
                <div className="col-sm-6">
                  <span className="pr-2">Père</span>
                </div>
              )}
              {this.state.mode === 'site' &&
                <div className="col-sm-4 text-right">
                  <div className="dropdown">
                    <button
                      className="btn btn-inline text-secondary"
                      ref={this.state.refMvt}
                      onClick={this.onMenuMvt}
                    >
                      <MovementIcon className="text-secondary" />
                      <span>{selected.length}</span>
                      <MenuDownIcon className="text-secondary" />
                    </button>
                    {this.state.menuMvt && (
                      <Dropdown
                        myRef={this.state.refMvt}
                        onClose={this.onMenuMvt}
                        align="bottom-right"
                      >
                        <div
                          className="bg-light border border-secondary text-secondary"
                          aria-labelledby="dropdownMenuButton"
                        >
                          {(selected.length > 0) && (
                            <button
                              type="button"
                              className="text-secondary dropdown-item"
                              key={'SIMPLE'}
                              onClick={() => this.onSelectMvt('SIMPLE')}
                            >
                              Mvt sans notification
                            </button>
                          )}
                          {(selected.length > 0) && (
                            <button
                              type="button"
                              className="text-secondary dropdown-item"
                              key={'TRANSFER'}
                              onClick={() => this.onSelectMvt('TRANSFER')}
                            >
                              Mvt avec notification
                            </button>
                          )}
                          {(selected.length === 0) && (
                            <button
                              type="button"
                              className="text-secondary dropdown-item"
                              key={'INPUT'}
                              onClick={() => this.onSelectMvt('INPUT')}
                            >
                              Entrée
                            </button>
                          )}
                          {(selected.length > 0) && (
                            <button
                              type="button"
                              className="text-secondary dropdown-item"
                              key={'OUTPUT'}
                              onClick={() => this.onSelectMvt('OUTPUT')}
                            >
                              Sortie
                            </button>
                          )}
                        </div>
                      </Dropdown>
                    )}
                  </div>
                </div>
              }
            </div>
            {(this.state.typeMvt !== '') && 
              <CreateMovement
                loader={false}
                modal={true}
                mode={this.state.typeMvt}
                site={this.state.site}
                onClose={this.onCloseMvt}
                selected={selected}
              />
            }
            {causes.map(cause => (
              <div
                className={classnames('row row-line', counter++ % 2 !== 1 ? 'row-odd' : 'row-even')}
                key={cause.id}
              >
                <div className="col-sm-1 col-first">
                  <div
                    className={classnames(
                      'inline-select-line border border-secondary mr-2',
                      selected.includes(cause.id) && 'selected'
                    )}
                    onClick={() => this.onSelect(cause.id)}
                  >
                    <div className="inline-select-line-inner bg-secondary" />
                  </div>
                </div>
                <div className="col-sm-6">
                  <span>{cause.cau_code}</span>
                </div>
                <div className="col-sm-6">
                  <span>{cause.cause_type.caut_name}</span>
                </div>
                <div className="col-sm-4">
                  <span>{cause.cau_year}</span>
                </div>
                <div className="col-sm-3">
                  <span className="pr-2">{getSexlabel(cause.cau_sex, true, 'text-secondary')}</span>
                </div>
                {(this.state.mode === 'site' ||
                  (this.state.mode === 'cause' && this.state.item.cau_sex === 'M')) && (
                  <div className="col-sm-6">
                    <span className="pr-2">{cause.parent2 && cause.parent2.cau_code}</span>
                  </div>
                )}
                {(this.state.mode === 'site' ||
                  (this.state.mode === 'cause' && this.state.item.cau_sex === 'F')) && (
                  <div className="col-sm-6">
                    <span className="pr-2">{cause.parent1 && cause.parent1.cau_code}</span>
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

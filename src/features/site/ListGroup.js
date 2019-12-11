import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { HoverObserver } from '../layout';
import { buildModel, isInViewPort } from '../../common';
import { InlineList as InlineListCause } from '../cause';
import {
  MapCenter as MapCenterIcon,
  MapMove as MapMoveIcon,
  Documents as DocumentsIcon,
  Cause as CauseIcon,
} from '../icons';

export class ListGroup extends Component {
  static propTypes = {
    site: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    selected: PropTypes.string.isRequired,
    onSiteClick: PropTypes.func,
    onSiteMove: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      scrollHover: 0,
      documents: 0,
      causes: 0,
      selected: this.props.selected || 0,
    };
    this.scrollMouseEnter = this.scrollMouseEnter.bind(this);
    this.scrollMouseLeave = this.scrollMouseLeave.bind(this);
    this.onSiteDocuments = this.onSiteDocuments.bind(this);
    this.onSiteCauses = this.onSiteCauses.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadMore();
  }

  scrollMouseEnter(id) {
    this.setState({ scrollHover: id });
  }

  scrollMouseLeave() {
    this.setState({ scrollHover: 0 });
  }

  onSiteDocuments(id) {
    this.setState({ documents: id, causes: 0 });
  }

  onSiteCauses(id) {
    this.setState({ causes: id, documents: 0 });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.selected !== state.selected) {
      let documents = 0;
      if (props.selected === state.documents) {
        documents = state.documents;
      }
      let causes = 0;
      if (props.selected === state.causes) {
        causes = state.causes;
      }
      return {
        selected: props.selected,
        documents: documents,
        causes: causes,
      };
    }
    return null;
  }

  componentWillUpdate(nextProps, nextState) {
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selected !== prevState.selected) {
      if (this.refs) {
        const elem = this.refs['site-selector-' + this.state.selected];
        if (elem && !isInViewPort(elem)) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }

  render() {
    let items = false;
    if (this.props.site.items.FreeAsso_Site) {
      items = buildModel(this.props.site.items, 'FreeAsso_Site');
    }
    return (
      <div className="site-list-group">
        <ul className="list-group">
          {items &&
            items.map(item => {
              return (
                <li className="list-group-item" key={'listgroup-' + item.id}>
                  <HoverObserver
                    onMouseEnter={() => {
                      this.scrollMouseEnter(item.id);
                    }}
                    onMouseLeave={() => {
                      this.scrollMouseLeave();
                    }}
                  >
                    <div ref={'site-selector-' + item.id} className="row site-selector">
                      <div
                        className={classnames(
                          'card w-100',
                          this.state.selected == item.id && 'active',
                        )}
                      >
                        <div className="card-header">
                          <div className="card-header-title">{item.site_name}</div>
                          <ul
                            className={classnames(
                              'nav justify-content-end',
                              this.state.scrollHover === item.id || this.state.selected === item.id
                                ? 'scroll-visible'
                                : 'scroll-invisible',
                            )}
                          >
                            {this.props.onSiteClick && (
                              <li>
                                <a
                                  data-toggle="tooltip" 
                                  title="Recentrer"
                                  className="btn btn-primary btn-sm"
                                  onClick={() => {
                                    this.props.onSiteClick(item.id, item.site_coord);
                                  }}
                                >
                                  <MapCenterIcon color="white" />
                                </a>
                              </li>
                            )}
                            {this.props.onSiteMove && (
                              <li>
                                <a
                                  data-toggle="tooltip" 
                                  title="Déplacement du site"
                                  className="btn btn-primary btn-sm"
                                  onClick={() => {
                                    this.props.onSiteMove(item.id, item);
                                  }}
                                >
                                  <MapMoveIcon color="white" />
                                </a>
                              </li>
                            )}
                            <li>
                              <a
                                data-toggle="tooltip" 
                                title="Document"
                                className="btn btn-primary btn-sm"
                                onClick={() => {
                                  this.props.onSiteClick &&
                                    this.props.onSiteClick(item.id, item.site_coord);
                                  this.onSiteDocuments(item.id);
                                }}
                              >
                                <DocumentsIcon color="white" />
                              </a>
                            </li>
                            <li>
                              <a
                                data-toggle="tooltip" 
                                title="Animaux"
                                className="btn btn-primary btn-sm"
                                onClick={() => {
                                  this.props.onSiteClick &&
                                    this.props.onSiteClick(item.id, item.site_coord);
                                  this.onSiteCauses(item.id);
                                }}
                              >
                                <CauseIcon color="white" />
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="card-body">
                          <p>{item.site_address1}</p>
                          <p>
                            {item.site_cp} {item.site_town}
                          </p>
                        </div>
                        {this.state.selected === item.id &&
                          this.state.selected === this.state.documents && (
                            <div className="card-footer bg-transparent">
                              <p>Documents :</p>
                            </div>
                          )}
                        {this.state.selected === item.id &&
                          this.state.selected === this.state.causes && (
                            <div className="card-footer bg-transparent">
                              <p>Animaux :</p>
                              <InlineListCause site_id={item.id} />
                            </div>
                          )}
                      </div>
                    </div>
                  </HoverObserver>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    site: state.site,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListGroup);

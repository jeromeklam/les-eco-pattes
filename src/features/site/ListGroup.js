import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { HoverObserver } from 'freeassofront';
import { buildModel } from 'freejsonapi';
import { isInViewPort } from '../../common';
import { InlineList as InlineListCause } from '../cause';
import { CenteredLoading3Dots } from '../ui';
import {
  MapCenter as MapCenterIcon,
  MapMove as MapMoveIcon,
  Cause as CauseIcon,
  Photo as PhotoIcon,
  Document as DocumentIcon,
} from '../icons';
import { InlineMapPhotos } from './';

export class ListGroup extends Component {
  static propTypes = {
    site: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    selected: PropTypes.number.isRequired,
    onSiteClick: PropTypes.func,
    onSiteMove: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      scrollHover: 0,
      documents: 0,
      causes: 0,
      photos: 0,
      selected: this.props.selected || 0,
    };
    this.scrollMouseEnter = this.scrollMouseEnter.bind(this);
    this.scrollMouseLeave = this.scrollMouseLeave.bind(this);
    this.onSiteDocuments = this.onSiteDocuments.bind(this);
    this.onSitePhotos = this.onSitePhotos.bind(this);
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
    this.setState({ photos: 0, documents: id, causes: 0 });
    this.props.actions.loadDocuments(id, true).then(result => {});
  }

  onSitePhotos(id) {
    this.setState({ photos: id, documents: 0, causes: 0 });
    this.props.actions.loadPhotos(id, true).then(result => {});
  }

  onSiteCauses(id) {
    this.setState({ photos: 0, causes: id, documents: 0 });
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
    if (this.props.site.loadMorePending) {
      return (
        <div className="site-list-group">
          <CenteredLoading3Dots />
        </div>
      );
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
                          this.state.selected === item.id && 'active',
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
                                <div
                                  data-toggle="tooltip" 
                                  title="Recentrer"
                                  className="ml-2"
                                  onClick={() => {
                                    this.props.onSiteClick(item.id, item.site_coord);
                                  }}
                                >
                                  <MapCenterIcon size={0.8} className="text-secondary inline-action" />
                                </div>
                              </li>
                            )}
                            {this.props.onSiteMove && (
                              <li>
                                <div
                                  data-toggle="tooltip" 
                                  title="Déplacement du site"
                                  className="ml-2"
                                  onClick={() => {
                                    this.props.onSiteMove(item.id, item);
                                  }}
                                >
                                  <MapMoveIcon size={0.8} className="text-secondary inline-action" />
                                </div>
                              </li>
                            )}
                            <li>
                              <div
                                data-toggle="tooltip" 
                                title="Documents"
                                className="ml-2"
                                onClick={() => {
                                  this.props.onSiteClick &&
                                    this.props.onSiteClick(item.id, item.site_coord);
                                  this.onSiteDocuments(item.id);
                                }}
                              >
                                <DocumentIcon size={0.8} className="text-secondary inline-action" />
                              </div>
                            </li>
                            <li>
                              <div
                                data-toggle="tooltip" 
                                title="Photos"
                                className="ml-2"
                                onClick={() => {
                                  this.props.onSiteClick &&
                                    this.props.onSiteClick(item.id, item.site_coord);
                                  this.onSitePhotos(item.id);
                                }}
                              >
                                <PhotoIcon size={0.8} className="text-secondary inline-action" />
                              </div>
                            </li>
                            <li>
                              <div
                                data-toggle="tooltip" 
                                title="Animaux"
                                className="ml-2"
                                onClick={() => {
                                  this.props.onSiteClick &&
                                    this.props.onSiteClick(item.id, item.site_coord);
                                  this.onSiteCauses(item.id);
                                }}
                              >
                                <CauseIcon size={0.8} className="text-secondary inline-action" />
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="card-body p-2">
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
                          )
                        }
                        {this.state.selected === item.id &&
                          this.state.selected === this.state.photos && (
                            <div className="card-footer bg-transparent">
                              <p>Photos :</p>
                              <InlineMapPhotos />
                            </div>
                          )
                        }
                        {this.state.selected === item.id &&
                          this.state.selected === this.state.causes && (
                            <div className="card-footer bg-transparent">
                              <InlineListCause site_id={item.id} />
                            </div>
                          )
                        }
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

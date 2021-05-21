import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { HoverObserver } from 'react-bootstrap-front';
import { normalizedObjectModeler } from 'jsonapi-front';
import { isInViewPort } from '../../common';
import { InlineList as InlineListCause } from '../cause';
import { CenteredLoading3Dots } from '../ui';
import {
  MapCenter as MapCenterIcon,
  MapMove as MapMoveIcon,
  Cause as CauseIcon,
  Photo as PhotoIcon,
  Document as DocumentIcon,
  GetOne as GetOneIcon,
  MapPose as MapPoseIcon,
} from '../icons';
import { Input as ModifySite } from '../site';
import { InlinePhotos, InlineDocuments } from './';

export class ListGroup extends Component {
  static propTypes = {
    site: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    selected: PropTypes.number.isRequired,
    onSiteClick: PropTypes.func,
    onSiteMove: PropTypes.func,
    onSitePose: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      scrollHover: 0,
      documents: 0,
      causes: 0,
      photos: 0,
      modify: -1,
      selected: this.props.selected || 0,
    };
    this.scrollMouseEnter = this.scrollMouseEnter.bind(this);
    this.scrollMouseLeave = this.scrollMouseLeave.bind(this);
    this.onSiteDocuments = this.onSiteDocuments.bind(this);
    this.onSitePhotos = this.onSitePhotos.bind(this);
    this.onSiteCauses = this.onSiteCauses.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  componentDidMount() {
    if (this.refs) {
      const elem = this.refs['site-selector-' + this.state.selected];
      if (elem && !isInViewPort(elem)) {
        elem.scrollIntoView({ behavior: 'smooth' });
      } 
    }
    this.props.actions.loadMore();
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

  scrollMouseEnter(id) {
    this.setState({ scrollHover: id });
  }

  scrollMouseLeave() {
    this.setState({ scrollHover: 0 });
  }

  onSiteDocuments(id) {
    this.setState({ photos: 0, documents: id, causes: 0, modify: 0 });
    this.props.actions.loadDocuments(id, true).then(result => {});
  }

  onSitePhotos(id) {
    this.setState({ photos: id, documents: 0, causes: 0, modify: 0 });
    this.props.actions.loadPhotos(id, true).then(result => {});
  }

  onSiteCauses(id) {
    this.setState({ photos: 0, causes: id, documents: 0, modify: 0 });
  }

  onSiteModify(id) {
    this.setState({ photos: 0, causes: 0, documents: 0, modify: id });
  }

  onClose() {
    this.setState({ modify: -1 });
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

  render() {
    let items = false;
    if (this.props.site.items.FreeAsso_Site) {
      items = normalizedObjectModeler(this.props.site.items, 'FreeAsso_Site');
    }
    if (this.props.site.loadMorePending) {
      return (
        <div className="site-list-group">
          <CenteredLoading3Dots />
        </div>
      );
    }
    //console.log("FK render liste ",this.state.selected,this.state.causes);
    return (
      <div className="site-list-group">
        <ul className="list-group">
          {items &&
            items.map(item => {
              //console.log("FK render liste ",parseInt(item.id,10),this.state.selected,parseInt(this.state.causes,10),this.state.modify);
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
                            {( this.props.onSiteClick && item.site_coord ) && (
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
                            {( this.props.onSiteMove && item.site_coord ) && (
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
                            {( this.props.onSitePose && !item.site_coord)  && (
                              <li>
                                <div
                                  data-toggle="tooltip" 
                                  title="Positionnement du site"
                                  className="ml-2"
                                  onClick={() => {
                                    this.props.onSitePose(item.id, item);
                                  }}
                                >
                                  <MapPoseIcon size={0.8} className="text-secondary inline-action" />
                                </div>
                              </li>
                            )}
                            <li>
                              <div
                                data-toggle="tooltip" 
                                title="Documents"
                                className="ml-2"
                                onClick={() => {
                                  //this.props.onSiteClick && this.props.onSiteClick(item.id, item.site_coord);
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
                                  //this.props.onSiteClick && this.props.onSiteClick(item.id, item.site_coord);
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
                                  // this.props.onSiteClick && this.props.onSiteClick(item.id, item.site_coord);
                                  this.onSiteCauses(item.id);
                                }}
                              >
                                <CauseIcon size={0.8} className="text-secondary inline-action" />
                              </div>
                            </li>
                            <li>
                              <div
                                data-toggle="tooltip" 
                                title="Modifier"
                                className="ml-2"
                                onClick={() => {
                                  //this.props.onSiteClick && this.props.onSiteClick(item.id, item.site_coord);
                                  this.onSiteModify(item.id);
                                }}
                              >
                                <GetOneIcon size={0.8} className="text-secondary inline-action" />
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="card-body p-2">
                          <p>{item.site_address1}</p>
                          <p>
                            {item.site_cp} {item.site_town}
                          </p> 
                          {!item.site_coord && (
                            <p className="text-warning">{'- '}Site non localisé{' -'}</p>
                          )}
                        </div>
                        {parseInt(this.state.documents,10) === parseInt(item.id,10) && (
                            <div className="card-footer bg-transparent">
                              <p>Documents :</p>
                              <InlineDocuments siteId={item.id} inline={true} />
                            </div>
                          )
                        }
                        {parseInt(this.state.photos,10) === parseInt(item.id,10) && (
                          <div className="card-footer bg-transparent">
                            <p>Photos :</p>
                            <InlinePhotos siteId={item.id} inline={true} />
                          </div>
                        )}
                        {parseInt(this.state.causes,10) === parseInt(item.id,10) && (
                          <div className="card-footer bg-transparent">
                            <InlineListCause site_id={item.id} />
                          </div>
                        )}  
                        {parseInt(item.id, 10) === parseInt(this.state.modify,10) &&
                          <ModifySite loader={false} modal={true} siteId={this.state.modify} onClose={this.onClose} />
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

function mapStateToProps(state) {
  return {
    site: state.site,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListGroup);

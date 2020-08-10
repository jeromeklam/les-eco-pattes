import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { ResponsiveConfirm } from 'freeassofront';
import { CenteredLoading3Dots } from '../ui';
import * as actions from './redux/actions';
import { propagateModel } from '../../common';
import {
  DelOne as DelOneIcon,
  Download as DownloadIcon,
  View as ViewIcon,
  Upload as UploadIcon,
  Comment as CommentIcon,
} from '../icons';
import { downloadCauseMediaBlob, getMedias } from './';
import { downloadBlob, ImageModal, CommentModal, modifySuccess, showErrors } from '../ui';

export class InlinePhotos extends Component {
  static propTypes = {
    cause: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.cauId !== state.cause_id) {
      return({cause_id: props.cauId});
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      cause_id: props.cauId || null,
      confirm: false,
      caum_id: 0,
      view: false,
      blob: false,
      item: null,
      items: [],
      loading: true,
      comment: false,
    };
    this.onDropFiles = this.onDropFiles.bind(this);
    this.onConfirmClose = this.onConfirmClose.bind(this);
    this.onConfirmPhoto = this.onConfirmPhoto.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onDownload = this.onDownload.bind(this);
    this.onView = this.onView.bind(this);
    this.onCloseView = this.onCloseView.bind(this);
    this.onComment = this.onComment.bind(this);
    this.onValidComment = this.onValidComment.bind(this); 
    this.onCloseComment = this.onCloseComment.bind(this);
    this.localLoadPhotos = this.localLoadPhotos.bind(this);
  }

  localLoadPhotos() {
    this.setState({loading: true});
    getMedias(this.state.cause_id, 'PHOTO')
      .then(result => {
        this.setState({items: result, loading: false});
      })
    ;
  }

  componentDidMount() {
    this.localLoadPhotos();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cause_id !== this.state.cause_id) {
      this.localLoadPhotos();
    }
  }

  onDropFiles(id, acceptedFiles) {
    const promises = acceptedFiles.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onabort = () => {
          reject();
        };
        reader.onerror = error => {
          reject(error);
        };
        reader.onload = () => {
          // Do whatever you want with the file contents
          const binaryStr = reader.result;
          this.props.actions
            .uploadCauseMedia(0, id, binaryStr, file.name)
            .then(result => resolve(true));
        };
        reader.readAsDataURL(file);
      });
    });
    const reload = Promise.all(promises);
    reload.then(result => {
      this.localLoadPhotos();
    });
  }

  onConfirmClose() {
    this.setState({ confirm: false, caum_id: 0 });
  }

  onConfirmPhoto(id) {
    this.setState({ confirm: !this.state.confirm, caum_id: id });
  }

  onDownload(item) {
    downloadCauseMediaBlob(item.id, true).then(result => {
      const type = result.headers['content-type'] || 'application/octet-stream';
      const blob = result.data;
      downloadBlob(blob, type, item.caum_title);
    });
  }

  onView(item) {
    downloadCauseMediaBlob(item.id, true).then(result => {
      const type = result.headers['content-type'] || 'application/octet-stream';
      const bytes = new Uint8Array(result.data);
      const blob = new Blob([bytes], { type: type });
      const url = window.URL.createObjectURL(blob);
      this.setState({ blob: url, view: true, comment: false ,item: item });
    });
  }

  onCloseView() {
    this.setState({ blob: null, view: false, comment: false, item: null });
  }

  onComment(item) {
    this.setState({ blob: null, view: false, comment: true , item: item });
  }

  onValidComment(comment) {
    let photo = this.state.item;
    this.props.actions
      .updateCauseMediaDesc(photo.id, this.state.cause_id, comment)
      .then(result => {
        modifySuccess();
        //this.props.actions.propagateModel('FreeAsso_CauseMedia', result);
        this.setState({ comment: false, item: null });
        this.localLoadPhotos();
      })
      .catch(errors => {
        showErrors(this.props.intl, errors, 'updateOneError');
     });
  }

  onCloseComment() {
    this.setState({ blob: null, view: false, comment: false, item: null });
  }

  onConfirm() {
    const caum_id = this.state.caum_id;
    this.setState({ confirm: false, caum_id: 0 });
    this.props.actions.delCauseMedia(caum_id).then(result => {
      this.localLoadPhotos();
    });
  }

  render() {
    const photos = this.state.items;
    return (
      <div>
        <div className="cause-inline-photos">
          {this.state.loading ? (
            <CenteredLoading3Dots />
          ) : (
            <div className="row p-2 row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3">
              {photos && photos.map(photo => {
                let img = '';
                try {
                  if (photo.caum_short_blob) {                    
                    img = `data:image/jpeg;base64,${photo.caum_short_blob}`;
                  }
                } catch (ex) {
                  console.log(ex);
                }
                return (
                  <div className="col" key={photo.id}>
                    <div className="card mt-2">
                      <div className="card-header bg-light">
                        <div className="row">
                          <div className="col-16"></div>
                          <div className="col-20 text-right">
                            <div className="btn-group btn-group-sm" role="group" aria-label="...">
                              <button type="button" className="btn btn-inline btn-secondary">
                                <CommentIcon
                                  className="text-light inline-action"
                                  onClick={() => this.onComment(photo)}
                                />
                              </button>
                              <button type="button" className="btn btn-inline btn-secondary">
                                <ViewIcon
                                  className="text-light inline-action"
                                  onClick={() => this.onView(photo)}
                                />
                              </button>
                              <button type="button" className="btn btn-inline btn-secondary">
                                <DownloadIcon
                                  className="text-light inline-action"
                                  onClick={() => this.onDownload(photo)}
                                />
                              </button>
                              <button type="button" className="btn btn-inline btn-warning">
                                <DelOneIcon
                                  onClick={() => this.onConfirmPhoto(photo.id)}
                                  className="text-light inline-action"
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-body text-center">
                        <div className="row">
                          <div className="col-36">
                            {img && <img src={img} className="rounded" alt="" />}
                          </div>
                          <div className="col-36">
                            <small className="text-center text-secondary">{photo.caum_title}</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="col" key={'000'}>
                <div className="card mt-2">
                  <div className="card-header bg-light text-secondary">
                    <div className="row">
                      <div className="col-36">
                        <span className="">Ajouter une photo</span>
                      </div>
                    </div>
                  </div>
                  <div className="card-body text-center">
                    {this.props.cause.uploadPhotoPending ? (
                      <div className="text-center">
                        <CenteredLoading3Dots />
                      </div>
                    ) : (
                      <Dropzone
                        onDrop={acceptedFiles => {
                          this.onDropFiles(this.state.cause_id, acceptedFiles);
                        }}
                      >
                        {({ getRootProps, getInputProps }) => (
                         <section>
                           <div {...getRootProps()}>
                             <input {...getInputProps()} />
                             <UploadIcon className="text-primary inline-action" size={4} />
                          </div>
                          </section>
                        )}
                      </Dropzone>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {this.state.view && (
          <ImageModal
            show={this.state.view}
            onClose={this.onCloseView}
            title=""
            image={this.state.blob}
          />
        )}
        {this.state.comment && (
          <CommentModal
            show={this.state.comment}
            onClose={this.onCloseComment}
            comment={this.state.item.caum_desc}
            onSubmit={(comm) => {
              this.onValidComment(comm);
            }}
          />
        )}
        <ResponsiveConfirm
          show={this.state.confirm}
          onClose={this.onConfirmClose}
          onConfirm={() => {
            this.onConfirm();
          }}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cause: state.cause,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, propagateModel }, dispatch),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(InlinePhotos));

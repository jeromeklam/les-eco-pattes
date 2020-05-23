import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { buildModel } from 'freejsonapi';
import { ResponsiveConfirm } from 'freeassofront';
import { CenteredLoading3Dots } from '../ui';
import * as actions from './redux/actions';
import {
  DelOne as DelOneIcon,
  Download as DownloadIcon,
  View as ViewIcon,
  Upload as UploadIcon,
} from '../icons';
import { downloadCauseMediaBlob } from './';
import { downloadBlob, ImageModal } from '../ui';

export class InlinePhotos extends Component {
  static propTypes = {
    cause: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.causeId !== state.cause_id) {
      return({cause_id: props.causeId});
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
    };
    this.onDropFiles = this.onDropFiles.bind(this);
    this.onConfirmClose = this.onConfirmClose.bind(this);
    this.onConfirmPhoto = this.onConfirmPhoto.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onDownload = this.onDownload.bind(this);
    this.onView = this.onView.bind(this);
    this.onCloseView = this.onCloseView.bind(this);
  }

  componentDidMount() {
    console.log("FK CDM", this.state);
    this.props.actions.loadPhotos(this.state.cause_id, true).then(result => {});
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cause_id !== this.state.cause_id) {
      this.props.actions.loadPhotos(this.state.cause_id, true).then(result => {});
    }
  }

  onDropFiles(item, acceptedFiles) {
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
            .uploadCauseMedia(0, item.id, binaryStr, file.name)
            .then(result => resolve(true));
        };
        reader.readAsDataURL(file);
      });
    });
    const reload = Promise.all(promises);
    reload.then(result => {
      this.props.actions.loadPhotos(item.id, true);
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
      this.setState({ blob: url, view: true, item: item });
    });
  }

  onCloseView() {
    this.setState({ blob: null, view: false, item: null });
  }

  onConfirm() {
    const caum_id = this.state.caum_id;
    this.setState({ confirm: false, caum_id: 0 });
    this.props.actions.delCauseMedia(caum_id).then(result => {
      const id = this.props.cause.currentItem.id;
      this.props.actions.loadPhotos(id, true);
    });
  }

  render() {
    let photos = [];
    if (this.props.cause.photos.FreeAsso_CauseMedia) {
      photos = buildModel(this.props.cause.photos, 'FreeAsso_CauseMedia');
    }
    return (
      <div>
        <div className="cause-inline-photos">
          {this.props.cause.loadPhotosPending ? (
            <CenteredLoading3Dots />
          ) : (
            <div className="row p-2 row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3">
              {photos.map(photo => {
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
                          this.onDropFiles(this.props.cause.currentItem, acceptedFiles);
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
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InlinePhotos);

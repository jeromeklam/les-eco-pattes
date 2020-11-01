import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FileIcon, defaultStyles } from 'react-file-icon';
import Dropzone from 'react-dropzone';
import * as actions from './redux/actions';
import { ResponsiveConfirm } from 'react-bootstrap-front';
import { DelOne as DelOneIcon, Download as DownloadIcon, Upload as UploadIcon } from '../icons';
import { CenteredLoading3Dots, downloadBlob } from '../ui';
import { downloadCauseMediaBlob, getMedias } from './';

export class InlineDocuments extends Component {
  static propTypes = {
    cause: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.cauId !== state.cau_id) {
      return { cau_id: props.cauId };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      cau_id: props.cauId || null,
      confirm: false,
      caum_id: 0,
      items: [],
      loading: true,
      uploading: false,
    };
    this.onDropFiles = this.onDropFiles.bind(this);
    this.onConfirmClose = this.onConfirmClose.bind(this);
    this.onConfirmDocument = this.onConfirmDocument.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onDownload = this.onDownload.bind(this);
    this.localLoadDocuments = this.localLoadDocuments.bind(this);
  }

  localLoadDocuments() {
    this.setState({ loading: true });
    getMedias(this.state.cau_id, 'OTHER').then(result => {
      this.setState({ items: result, loading: false });
    });
  }

  componentDidMount() {
    this.localLoadDocuments();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cau_id !== this.state.cau_id) {
      this.localLoadDocuments();
    }
  }

  onDropFiles(id, acceptedFiles) {
    this.setState({ uploading: true });
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
            .then(result => {
              resolve(true);
              this.setState({ uploading: false });
            })
            .catch(error => {
              this.setState({ uploading: false });
            });
        };
        reader.readAsDataURL(file);
      });
    });
    const reload = Promise.all(promises);
    reload.then(result => {
      this.localLoadDocuments();
    });
  }

  onConfirmClose() {
    this.setState({ confirm: false, caum_id: 0 });
  }

  onConfirmDocument(id) {
    this.setState({ confirm: !this.state.confirm, caum_id: id });
  }

  onDownload(item) {
    downloadCauseMediaBlob(item.id, true).then(result => {
      const type = result.headers['content-type'] || 'application/octet-stream';
      const blob = result.data;
      downloadBlob(blob, type, item.caum_title);
    });
  }

  onConfirm() {
    const caum_id = this.state.caum_id;
    this.setState({ confirm: false, caum_id: 0 });
    this.props.actions.delCauseMedia(caum_id).then(result => {
      this.localLoadDocuments();
    });
  }

  render() {
    let documents = this.state.items;
    return (
      <div>
        <div className="cause-inline-documents">
          {this.props.cause.loadDocumentsPending ? (
            <CenteredLoading3Dots />
          ) : (
            <div className="row p-2 row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3">
              {documents &&
                documents.map(document => {
                  let content = <FileIcon type="document" size={80} {...defaultStyles.docx} />;
                  try {
                    const ext = document.caum_title.split('.').pop();
                    let style = defaultStyles[ext];
                    content = <FileIcon size={80} extension={ext} {...style} />;
                  } catch (ex) {
                    // @TODO
                  }
                  return (
                    <div className="col" key={document.id}>
                      <div className="card mt-2">
                        <div className="card-header bg-light">
                          <div className="row">
                            <div className="col-xs-w16"></div>
                            <div className="col-xs-w20 text-right">
                              <div className="btn-group btn-group-sm" role="group" aria-label="...">
                                <button type="button" className="btn btn-inline btn-secondary">
                                  <DownloadIcon
                                    onClick={() => this.onDownload(document)}
                                    className="text-light inline-action"
                                  />
                                </button>
                                <button type="button" className="btn btn-inline btn-warning">
                                  <DelOneIcon
                                    onClick={() => this.onConfirmDocument(document.id)}
                                    className="text-light inline-action"
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card-body text-center">
                          <div className="row">
                            <div className="col-xs-w36">{content}</div>
                            <div className="col-xs-w36">
                              <small className="text-center text-secondary">
                                {document.caum_title}
                              </small>
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
                      <div className="col-xs-w36">
                        <span className="">Ajouter un document</span>
                      </div>
                    </div>
                  </div>
                  <div className="card-body text-center">
                    {this.state.uploading ? (
                      <CenteredLoading3Dots />
                    ) : (
                      <Dropzone
                        onDrop={acceptedFiles => {
                          this.onDropFiles(this.state.cau_id, acceptedFiles);
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
        <ResponsiveConfirm
          show={this.state.confirm}
          onClose={this.onConfirmClose}
          onConfirm={() => {
            this.onConfirm(this.state.cau_id);
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

export default connect(mapStateToProps, mapDispatchToProps)(InlineDocuments);

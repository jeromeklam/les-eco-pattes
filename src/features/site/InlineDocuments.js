import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import * as actions from './redux/actions';
import { ResponsiveConfirm } from 'freeassofront';
import { CenteredLoading3Dots } from '../ui';
import FileIcon, { defaultStyles } from 'react-file-icon';
import { DelOne as DelOneIcon, Download as DownloadIcon, Upload as UploadIcon } from '../icons';
import { downloadSiteMediaBlob } from './';
import { downloadBlob } from '../ui';

export class InlineDocuments extends Component {
  static propTypes = {
    site: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.siteId !== state.site_id) {
      return({site_id: props.siteId});
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      site_id: props.siteId || null,
      confirm: false,
      sitm_id: 0,
    };
    this.onDropFiles = this.onDropFiles.bind(this);
    this.onConfirmClose = this.onConfirmClose.bind(this);
    this.onConfirmDocument = this.onConfirmDocument.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onDownload = this.onDownload.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadDocuments(this.state.site_id, true).then(result => {});
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.site_id !== this.state.site_id) {
      this.props.actions.loadDocuments(this.state.site_id, true).then(result => {});
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
            .uploadSiteMedia(0, item.id, binaryStr, file.name)
            .then(result => resolve(true));
        };
        reader.readAsDataURL(file);
      });
    });
    const reload = Promise.all(promises);
    reload.then(result => {
      this.props.actions.loadDocuments(item.id, true);
    });
  }

  onConfirmClose() {
    this.setState({ confirm: false, sitm_id: 0 });
  }

  onConfirmDocument(id) {
    this.setState({ confirm: !this.state.confirm, sitm_id: id });
  }

  onDownload(item) {
    downloadSiteMediaBlob(item.id, true).then(result => {
      const type = result.headers['content-type'] || 'application/octet-stream';
      const blob = result.data;
      downloadBlob(blob, type, item.sitm_title);
    });
  }

  onConfirm() {
    const sitm_id = this.state.sitm_id;
    this.setState({ confirm: false, sitm_id: 0 });
    this.props.actions.delSiteMedia(sitm_id).then(result => {
      const id = this.props.site.currentItem.id;
      this.props.actions.loadDocuments(id, true);
    });
  }

  render() {
    return (
      <div>
        <div className="site-inline-documents">
          {this.props.site.loadDocumentsPending ? (
            <CenteredLoading3Dots />
          ) : (
            <div className="row p-2 row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3">
              {this.props.site.documentsModels &&
                this.props.site.documentsModels.map(document => {
                  let content = <FileIcon type="document" size={80} {...defaultStyles.docx} />;
                  try {
                    const ext = document.sitm_title.split('.').pop();
                    let style = defaultStyles[ext];
                    content = <FileIcon size={80} extension={ext} {...style} />;
                  } catch (ex) {
                    console.log(ex);
                  }
                  return (
                    <div className="col" key={document.id}>
                      <div className="card mt-2">
                        <div className="card-header bg-light">
                          <div className="row">
                            <div className="col-16"></div>
                            <div className="col-20 text-right">
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
                            <div className="col-36">{content}</div>
                            <div className="col-36">
                              <small className="text-center text-secondary">
                                {document.sitm_title}
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
                      <div className="col-36">
                        <span className="">Ajouter un document</span>
                      </div>
                    </div>
                  </div>
                  <div className="card-body text-center">
                    {this.props.site.uploadDocumentPending ? (
                      <div className="text-center">
                        <CenteredLoading3Dots />
                      </div>
                    ) : (
                      <Dropzone
                        onDrop={acceptedFiles => {
                          this.onDropFiles(this.props.site.currentItem, acceptedFiles);
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
            this.onConfirm(this.props.site.currentItem);
          }}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(InlineDocuments);

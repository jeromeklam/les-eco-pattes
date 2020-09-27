import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import FileIcon, { defaultStyles } from 'react-file-icon';
import * as actions from './redux/actions';
import { ResponsiveConfirm } from 'react-bootstrap-front';
import { DelOne as DelOneIcon, Download as DownloadIcon, Upload as UploadIcon } from '../icons';
import { CenteredLoading3Dots, downloadBlob } from '../ui';
import { downloadContractMediaBlob, getMedias } from './';

export class InlineDocuments extends Component {
  static propTypes = {
    contract: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.ctId !== state.ct_id) {
      return({ct_id: props.ctId});
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      ct_id: props.ctId || null,
      confirm: false,
      ctm_id: 0,
      items: [],
      loading: true,
    };
    this.onDropFiles = this.onDropFiles.bind(this);
    this.onConfirmClose = this.onConfirmClose.bind(this);
    this.onConfirmDocument = this.onConfirmDocument.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onDownload = this.onDownload.bind(this);
    this.localLoadDocuments = this.localLoadDocuments.bind(this);
  }

  localLoadDocuments() {
    this.setState({loading: true});
    getMedias(this.state.ct_id, 'OTHER')
      .then(result => {
        this.setState({items: result, loading: false});
      })
    ;
  }

  componentDidMount() {
    this.localLoadDocuments();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.ct_id !== this.state.ct_id) {
      this.localLoadDocuments();
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
            .uploadContractMedia(0, id, binaryStr, file.name)
            .then(result => resolve(true));
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
    this.setState({ confirm: false, ctm_id: 0 });
  }

  onConfirmDocument(id) {
    this.setState({ confirm: !this.state.confirm, ctm_id: id });
  }

  onDownload(item) {
    downloadContractMediaBlob(item.id, true).then(result => {
      const type = result.headers['content-type'] || 'application/octet-stream';
      const blob = result.data;
      downloadBlob(blob, type, item.ctm_title);
    });
  }

  onConfirm() {
    const ctm_id = this.state.ctm_id;
    this.setState({ confirm: false, ctm_id: 0 });
    this.props.actions.delContractMedia(ctm_id).then(result => {
      this.localLoadDocuments();
    });
  }

  render() {
    let documents = this.state.items;
    return (
      <div>
        <div className="contract-inline-documents">
          {this.props.contract.loadDocumentsPending ? (
            <CenteredLoading3Dots />
          ) : (
            <div className="row p-2 row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3">
              {documents && documents.map(document => {
                let content = <FileIcon type="document" size={80} {...defaultStyles.docx} />;
                try {
                  const ext = document.ctm_title.split('.').pop();
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
                              {document.ctm_title}
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
                    {this.props.contract.uploadDocumentPending ? (
                      <CenteredLoading3Dots />
                    ) : (
                      <Dropzone
                        onDrop={acceptedFiles => {
                          this.onDropFiles(this.state.ct_id, acceptedFiles);
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
            this.onConfirm(this.state.ct_id);
          }}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    contract: state.contract,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InlineDocuments);

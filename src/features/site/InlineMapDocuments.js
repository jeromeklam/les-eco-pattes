import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { buildModel } from 'freejsonapi';
import FileIcon, { defaultStyles } from 'react-file-icon';
import * as actions from './redux/actions';
import { downloadSiteMediaBlob } from './';
import { downloadBlob, CenteredLoading3Dots } from '../ui';
import { Download as DownloadIcon } from '../icons';

export class InlineMapDocuments extends Component {
  static propTypes = {
    site: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      blob: false,
      item: null,
    };
    this.onDownload = this.onDownload.bind(this);
  }

  onDownload(item) {
    downloadSiteMediaBlob(item.id, true).then(result => {
      const type = result.headers['content-type'] || 'application/octet-stream';
      const blob = result.data;
      downloadBlob(blob, type, item.sitm_title);
    });
  }

  render() {
    let documents = [];
    if (this.props.site.documents.FreeAsso_SiteMedia) {
      documents = buildModel(this.props.site.documents, 'FreeAsso_SiteMedia');
    }
    return (
      <div className="site-inline-map-documents">
        {this.props.site.loadDocumentsPending ? (
          <CenteredLoading3Dots />
        ) : (
          <div className="text-center">
            {documents.map(document => {
              let content = <FileIcon type="document" size={80} {...defaultStyles.docx} />;
              try {
                const ext = document.sitm_title.split('.').pop();
                let style = defaultStyles[ext];
                content = <FileIcon size={80} extension={ext} {...style} />;
              } catch (ex) {
                console.log(ex);
              }
              return (
                <div className="row">
                  <div className="col-36 text-center">
                    {content}
                    <div
                      className="btn-group btn-group-vertical"
                      role="group"
                      aria-label="First group"
                    >
                      <div className="ml-2">
                        <DownloadIcon
                          className="text-secondary inline-action"
                          onClick={() => this.onDownload(document)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-36">
                    <small className="text-center text-secondary">{document.sitm_title}</small>
                  </div>
                </div>
              );
            })}
          </div>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(InlineMapDocuments);

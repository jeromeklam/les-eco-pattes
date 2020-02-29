import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { buildModel } from 'freejsonapi';
import * as actions from './redux/actions';
import { View as ViewIcon, Download as DownloadIcon } from '../icons';
import { downloadSiteMediaBlob } from './';
import { downloadBlob, ImageModal, CenteredLoading3Dots } from '../ui';

export class InlineMapPhotos extends Component {
  static propTypes = {
    site: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      view: false,
      blob: false,
      item: null,
    };
    this.onDownload = this.onDownload.bind(this);
    this.onView = this.onView.bind(this);
    this.onCloseView = this.onCloseView.bind(this);
  }

  onDownload(item) {
    downloadSiteMediaBlob(item.id, true).then(result => {
      const type = result.headers['content-type'] || 'application/octet-stream';
      const blob = result.data;
      downloadBlob(blob, type, item.sitm_title);
    });
  }

  onView(item) {
    downloadSiteMediaBlob(item.id, true).then(result => {
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

  render() {
    let photos = [];
    if (this.props.site.photos.FreeAsso_SiteMedia) {
      photos = buildModel(this.props.site.photos, 'FreeAsso_SiteMedia');
    }
    return (
      <div>
        <div className="site-inline-photos">
          {this.props.site.loadPhotosPending ? (
            <CenteredLoading3Dots />
          ) : (
            <div className="">
              {photos.map(photo => {
                let img = '';
                try {
                  if (photo.sitm_short_blob) {
                    img = `data:image/jpeg;base64,${photo.sitm_short_blob}`;
                  }
                } catch (ex) {}
                return (
                  <div className="row">
                    <div className="col-36 text-center">
                      {img && <img src={img} className="rounded" alt="" />}
                      <div
                        className="btn-group btn-group-vertical"
                        role="group"
                        aria-label="First group"
                      >
                        <div className="ml-2">
                          <ViewIcon
                            className="text-secondary inline-action"
                            onClick={() => this.onView(photo)}
                            title={photo.sitm_title}
                          />
                        </div>
                        <div className="ml-2">
                          <DownloadIcon
                            className="text-secondary inline-action"
                            onClick={() => this.onDownload(photo)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {this.state.view && (
          <ImageModal
            show={this.state.view}
            onClose={this.onCloseView}
            title={Image}
            image={this.state.blob}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(InlineMapPhotos);

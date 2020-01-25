import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Loading3Dots } from 'freeassofront';
import { buildModel } from 'freejsonapi';
import * as actions from './redux/actions';

export class InlineMapPhotos extends Component {
  static propTypes = {
    site: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    let photos = [];
    if (this.props.site.photos.FreeAsso_SiteMedia) {
      photos = buildModel(this.props.site.photos, 'FreeAsso_SiteMedia');
    }
    return (
      <div>
        <div className="site-inline-photos">
          {this.props.site.loadPhotosPending ? (
            <div className="text-center">
              <Loading3Dots className="text-light" />
            </div>
          ) : (
            <div className="">
              {photos.map(photo => {
                let img = '';
                try {
                  if (photo.sitm_short_blob) {
                    img = `data:image/jpeg;base64,${photo.sitm_short_blob}`;
                  }
                } catch (ex) {
                  console.log(ex);
                }
                return (
                  <div className="row">
                    <div className="col-36 text-center">
                      {img && <img src={img} className="rounded" alt="" />}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
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
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InlineMapPhotos);

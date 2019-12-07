import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import GoogleMapReact from 'google-map-react';
import { loadMore as loadMoreSite } from '../site/redux/loadMore';

export class Map extends Component {
  static propTypes = {
    googleMap: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  static defaultProps = {
    center: {
      lat: 49.096306,
      lng: 6.160053,
    },
    zoom: 11,
  };

  componentDidMount() {
    this.props.actions.loadMoreSite();
  }

  render() {
    const items = this.state.site.items;
    const AnyReactComponent = ({ text }) => <div>{text}</div>;
    return (
      <div className="row">
        <div className="col-28">
          <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyCyfeklBqNHSkYG7tHZoLbwCc8quhsq8vg' }}
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
            >
              <AnyReactComponent lat={49.190541} lng={6.123827} text="My Marker" />
            </GoogleMapReact>
          </div>
        </div>
        <div calssName="col-8"></div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    site: state.site,
    cause: state.cause,
    googleMap: state.googleMap,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, loadMoreSite }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);

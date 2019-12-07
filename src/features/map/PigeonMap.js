import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';
import Overlay from 'pigeon-overlay';

const providers = {
  osm: (x, y, z) => {
    const s = String.fromCharCode(97 + ((x + y + z) % 3));
    return `https://${s}.tile.openstreetmap.org/${z}/${x}/${y}.png`;
  },
  wikimedia: (x, y, z, dpr) => {
    return `https://maps.wikimedia.org/osm-intl/${z}/${x}/${y}${dpr >= 2 ? '@2x' : ''}.png`;
  },
  stamen: (x, y, z, dpr) => {
    return `https://stamen-tiles.a.ssl.fastly.net/terrain/${z}/${x}/${y}${
      dpr >= 2 ? '@2x' : ''
    }.jpg`;
  },
};

const lng2tile = (lon, zoom) => ((lon + 180) / 360) * Math.pow(2, zoom);

const lat2tile = (lat, zoom) =>
  ((1 - Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) / Math.PI) /
    2) *
  Math.pow(2, zoom);

export class PigeonMap extends Component {
  static propTypes = {
    map: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      center: [49.096306, 6.160053],
      zoom: 12,
      provider: 'osm',
      metaWheelZoom: false,
      twoFingerDrag: false,
      animate: true,
      animating: false,
      zoomSnap: true,
      mouseEvents: true,
      touchEvents: true,
      minZoom: 1,
      maxZoom: 18,
    };
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
  }

  zoomIn(event) {
    this.setState({
      zoom: Math.min(this.state.zoom + 1, this.state.maxZoom),
    });
  }

  zoomOut(event) {
    this.setState({
      zoom: Math.max(this.state.zoom - 1, this.state.minZoom),
    });
  }

  render() {
    return (
      <div className="map-pigeon-map">
        <div className="map-content">
          <Map
            provider={providers[this.state.provider]}
            center={this.state.center}
            zoom={this.state.zoom}
            animate={this.state.animate}
          >
            <Marker
              anchor={this.state.center}
              payload={1}
              onClick={({ event, anchor, payload }) => {}}
            />
            <Overlay anchor={this.state.center} offset={[120, 79]}>
              <img src="pigeon.jpg" width={240} height={158} alt="" />
            </Overlay>
          </Map>
        </div>
        <div className="map-list">
          <div className="map-list-header">
            <button onClick={this.zoomIn}>Zoom In</button>
            <button onClick={this.zoomOut}>Zoom Out</button>
            <br />
            <span title={lat2tile(this.state.center[0], this.state.zoom)}>
              Lat: {Math.round(this.state.center[0] * 10000) / 10000}
            </span>
            <br />
            <span title={lng2tile(this.state.center[1], this.state.zoom)}>
              Lon: {Math.round(this.state.center[1] * 10000) / 10000}
            </span>
            <br />
            <span>Zoom: {Math.round(this.state.zoom * 100) / 100}</span>
            <br />
          </div>
          <div className="map-list-scroll"></div>
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    map: state.map,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PigeonMap);

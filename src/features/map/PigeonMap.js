import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Map from 'pigeon-maps';
import Draggable from 'pigeon-draggable';
import { buildModel, getJsonApi } from 'freejsonapi';
import { propagateModel } from '../../common';
import { loadMore as loadMoreSite, updateOne as updateOneSite } from '../site/redux/actions';
import Icon from '@mdi/react';
import { Responsive } from 'freeassofront';
import { mdiMagnifyMinus, mdiMagnifyPlus, mdiCrosshairsGps } from '@mdi/js';
import mapselect from '../../images/mapselect.png';
import { ListGroup } from '../site';
import { SiteMarker } from './';
import { modifySuccess, showErrors } from '../ui';

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
    let center = [49.096306, 6.160053];
    if (this.props.home.geoOn) {
      if (this.props.home.geoCoord) {
        center = [this.props.home.geoCoord.lat, this.props.home.geoCoord.lon];
      }
    }
    this.state = {
      center: center,
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
      dragging: false,
      selected: 0,
      moved: false,
      scrollHover: 0,
    };
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onSiteClick = this.onSiteClick.bind(this);
    this.onSiteMove = this.onSiteMove.bind(this);
    this.onSitePose = this.onSitePose.bind(this);
    this.localize = this.localize.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadMoreSite();
  }

  localize() {
    this.props.actions.loadMoreSite();
  }

  static getDerivedStateFromProps(props, state) {
    let center = [49.096306, 6.160053];
    let id = 0
    let lat = center[0];
    let lon = center[1];
    console.log("FK gDSFP",id,lat,lon);
    if ((props.match.params.id) || ((props.match.params.lat) && (props.match.params.lon))) {
      if (props.match.params.id) {
        id = parseInt(props.match.params.id,10);
      }
      if ((props.match.params.lat) && (props.match.params.lon)) {
        lat = parseFloat(props.match.params.lat);
        lon = parseFloat(props.match.params.lon);
      }
      if ((id !== state.selected) || (lat !== state.center.lat) || (lon !== state.center.lon)) {
        center = [lat, lon];
        return {            
          center: center,
          selected: id,
        };
      }
    } else {          
      if (props.home.geoCoord.lat !== state.center.lat && props.home.geoCoord.lon !== state.center.lon) {
        if (props.home.geoOn) {
          if (props.home.geoCoord) {
            center = [props.home.geoCoord.lat, props.home.geoCoord.lon];
            return {            
              center: center,
            };
          }
        }
      }
    }
    return null;
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

  onDragStart() {
    this.setState({
      dragging: true,
    });
  }

  onDragEnd(anchor, item) {
    console.log("DragEnd");
    item.site_coord = JSON.stringify({
      lat: anchor[0],
      lon: anchor[1],
    });
    this.setState({
      dragging: false,
      moved: 0,
    });
    let obj = getJsonApi(item, 'FreeAsso_Site', item.id);
    this.props.actions
      .updateOneSite(obj)
      .then(result => {
        modifySuccess();
        this.props.actions.propagateModel('FreeAsso_Site', result);
      })
      .catch(errors => {
         showErrors(this.props.intl, this.props.site.updateOneError);
      });
  }

  onClick({ event, latLng, pixel }) {
    //console.log("onClick")
    //console.log("FK click",latLng,pixel)
    this.props.history.push('/pigeon-map/' + this.state.selected  + "/" + latLng[0] + "/" + latLng[1]);
  }

  onMarkerClick({ event, anchor, payload }) { 
    //console.log("onMarkerClick")
    if (Array.isArray(anchor) && anchor.length >= 2) {
      this.props.history.push('/pigeon-map/' + parseInt(payload, 10)  + "/" + anchor[0] + "/" + anchor[1]);
    }
    //this.setState({ selected: parseInt(payload, 10), center: anchor, moved: false });
  }

  onSiteClick(id, anchorCoord) {
    //console.log("onSiteClick")
    let coord = this.state.center || [49.096306, 6.160053];
    const json = JSON.parse(anchorCoord);
    if (json) {
      coord = [json.lat, json.lon];
    }
    this.props.history.push('/pigeon-map/' + id  + "/" + coord[0] + "/" + coord[1]);
    //this.setState({ selected: id, center: coord, moved: false });
  }

  onSiteMove(id, item) {
    //console.log("onSiteMove")
    let coord = this.state.center || [49.096306, 6.160053];
    const json = JSON.parse(item.site_coord);
    if (json) {
      coord = [json.lat, json.lon];
    }
    if (this.state.moved === item) {
      this.setState({ moved: false });
    } else {
      this.setState({ moved: item });
    }
    this.props.history.push('/pigeon-map/' + id  + "/" + coord[0] + "/" + coord[1]);
    
    //this.setState({ selected: id, center: coord, moved: item });
  }

  onSitePose(id, item) {
    //console.log("FK SitePOse",id,item.id);
    let coord = this.state.center || [49.096306, 6.160053];
    this.setState({
      dragging: true,
      selected: id,
      moved: item,
    });
    this.props.history.push('/pigeon-map/' + id + "/" + coord[0] + "/" + coord[1]) ; 
  }

  render() {
    let items = false;
    if (this.props.site.items.FreeAsso_Site) {
      items = buildModel(this.props.site.items, 'FreeAsso_Site');
    }
    //console.log("FK render", parseInt(this.state.moved.id, 10)  === this.state.selected, this.state.moved.id ,this.state.selected, this.state.center  )
    console.log("FK render", this.state.moved.id, this.state.selected);
    return (
      <div className="map-pigeon-map bg-light">
        <Responsive displayIn={['Laptop', 'Tablet']}>
          <div className={classnames('map-content')}>
            <Map
              provider={providers[this.state.provider]}
              center={this.state.center}
              zoom={this.state.zoom}
              animate={this.state.animate}
              onClick={this.onClick}
            >
              {items &&
                items.map(item => {
                  const json = JSON.parse(item.site_coord);
                  if (json) {
                    const coord = [json.lat, json.lon];
                    return (
                      <SiteMarker
                        key={item.id}
                        title={item.site_name}
                        anchor={coord}
                        payload={item.id}
                        onClick={this.onMarkerClick}
                        hover={this.state.selected === item.id}
                      />
                    );
                  }
                  return null;
                })}
              {this.state.moved && parseInt(this.state.moved.id, 10) === this.state.selected && (
                <Draggable
                  anchor={this.state.center}
                  offset={[14, 30]}
                  onDragStart={this.onDragStart}
                  onDragEnd={anchor => {
                    this.onDragEnd(anchor, this.state.moved);
                  }}
                >
                  <img className="map-selector" src={mapselect} alt="" />
                </Draggable>
              )}
            </Map>
          </div>
          <div className="map-list-header">
            <button className="btn btn-primary btn-sm" onClick={this.zoomIn}>
              <Icon path={mdiMagnifyPlus} size={1} color="white" />
            </button>
            <button className="btn btn-primary btn-sm" onClick={this.zoomOut}>
              <Icon path={mdiMagnifyMinus} size={1} color="white" />
            </button>
            <button className="btn btn-primary btn-sm" onClick={this.localize}>
              <Icon path={mdiCrosshairsGps} size={1} color="white" />
            </button>
            <br />
            <p>
              Position : {Math.round(this.state.center[0] * 10000) / 10000},{' '}
              {Math.round(this.state.center[1] * 10000) / 10000} /{' '}
              {Math.round(this.state.zoom * 100) / 100}
            </p>
          </div>
          <div className="map-list-scroll">
            <ListGroup
              selected={this.state.selected}
              onSiteClick={this.onSiteClick}
              onSiteMove={this.onSiteMove}
              onSitePose={this.onSitePose}
            />
          </div>
        </Responsive>
        <Responsive displayIn={['Mobile']}>
          <div className={classnames('map-content-mobile')}>
            <Map
              provider={providers[this.state.provider]}
              center={this.state.center}
              zoom={this.state.zoom}
              animate={this.state.animate}
              onClick={this.onClick}
            >
              {items &&
                items.map(item => {
                  const json = JSON.parse(item.site_coord);
                  if (json) {
                    const coord = [json.lat, json.lon];
                    return (
                      <SiteMarker
                        key={item.id}
                        title={item.site_name}
                        anchor={coord}
                        payload={item.id}
                        onClick={this.onMarkerClick}
                        hover={this.state.selected === item.id}
                      />
                    );
                  }
                  return null;
                })}
              {this.state.moved && this.state.moved.id === this.state.selected && (
                <Draggable
                  anchor={this.state.center}
                  offset={[14, 30]}
                  onDragStart={this.onDragStart}
                  onDragEnd={anchor => {
                    this.onDragEnd(anchor, this.state.moved);
                  }}
                >
                  <img className="map-selector" src={mapselect} alt="" />
                </Draggable>
              )}
            </Map>
          </div>
          <div className="map-list-header-mobile">
            <button className="btn btn-primary btn-sm" onClick={this.zoomIn}>
              <Icon path={mdiMagnifyPlus} size={1} color="white" />
            </button>
            <button className="btn btn-primary btn-sm" onClick={this.zoomOut}>
              <Icon path={mdiMagnifyMinus} size={1} color="white" />
            </button>
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
            <hr />
          </div>
          <div className="map-list-scroll-mobile">
            <ListGroup
              selected={this.state.selected}
              onSiteClick={this.onSiteClick}
              onSiteMove={this.onSiteMove}
              onSitePose={this.onSitePose}
            />
          </div>
        </Responsive>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    home: state.home,
    map: state.map,
    site: state.site,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { ...actions, loadMoreSite, updateOneSite, propagateModel },
      dispatch,
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PigeonMap);
